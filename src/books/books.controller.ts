import { Controller, Get } from '@nestjs/common';
import { Books } from './books.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  cgetAction(): Promise<Books[]> {
    return this.booksService.findAll();
  }
}
