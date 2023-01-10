import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { Books } from './books.entity'
import { BooksService } from './books.service'
import { PostBookDto } from './dto/post-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  cgetAction(): Promise<Books[]> {
    return this.booksService.findAll()
  }

  @Get(':id')
  getAction(@Param('id') id: number): Promise<Books> {
    return this.booksService.findOne(id)
  }

  @Post()
  postAction(@Body() PostBookDto: PostBookDto): Promise<string> {
    console.log(PostBookDto)
    return this.booksService.create(PostBookDto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() UpdateBookDto: UpdateBookDto) {
    return this.booksService.update(id, UpdateBookDto)
  }

  @Delete()
  @HttpCode(204)
  deleteAction(): string {
    return 'This action adds a new cat'
  }
}
