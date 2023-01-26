/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Books } from './books.entity'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('books') // 엔드포인트
@ApiTags('책 API')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({
    summary: '책목록 조회',
    description: '책목록을 조회한다.',
  })
  cgetAction(@Query('filter') filter: string | null): Promise<Books[]> {
    const filters = filter ? JSON.parse(filter) : null
    return this.booksService.findAll(filters)
  }

  @Get(':id')
  @ApiOperation({
    summary: '책 상세',
    description: '책 상세정보를 가져온다.',
  })
  getAction(@Param('id') id: number): Promise<Books> {
    return this.booksService.findOne(id)
  }

  @Post()
  @ApiOperation({
    summary: '책목록 생성',
    description: '책목록을 생성한다.',
  })
  postAction(@Body() PostBookDto: CreateBookDto): Promise<Books> {
    return this.booksService.create(PostBookDto)
  }

  @Put(':id')
  @ApiOperation({
    summary: '책목록 수정',
    description: '책목록을 수정한다.',
  })
  putAction(@Param('id') id: number, @Body() UpdateBookDto: UpdateBookDto) {
    return this.booksService.update(id, UpdateBookDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: '책목록 삭제',
    description: '책목록을 삭제한다.',
  })
  @HttpCode(204) // 리턴 코드
  deleteAction(@Param('id') id: number) {
    return this.booksService.delete(id)
  }

  @Delete()
  deleteAllAction() {
    if (process.env.NODE_ENV === 'test') {
      return this.booksService.resetTable()
    }
  }
}
