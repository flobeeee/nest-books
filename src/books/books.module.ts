import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { BooksController } from './books.controller'
import { booksProviders } from './books.providers'
import { BooksService } from './books.service'

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [...booksProviders, BooksService],
})
export class BooksModule {}
