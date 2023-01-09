import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private bookRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.bookRepository.find();
  }
}
