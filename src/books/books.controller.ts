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
import { Books } from './books.entity'
import { BooksService } from './books.service'
import { PostBookDto } from './dto/post-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('books') // 엔드포인트
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  cgetAction(@Query('filter') filter: string | null): Promise<Books[]> {
    const filters = filter ? JSON.parse(filter) : null
    return this.booksService.findAll(filters)
  }

  @Get(':id')
  getAction(@Param('id') id: number): Promise<Books> {
    return this.booksService.findOne(id)
  }

  @Post()
  postAction(@Body() PostBookDto: PostBookDto): Promise<Books> {
    return this.booksService.create(PostBookDto)
  }

  @Put(':id')
  putAction(@Param('id') id: number, @Body() UpdateBookDto: UpdateBookDto) {
    return this.booksService.update(id, UpdateBookDto)
  }

  @Delete(':id')
  @HttpCode(204) // 리턴 코드
  deleteAction(@Param('id') id: number) {
    return this.booksService.delete(id)
  }
}
