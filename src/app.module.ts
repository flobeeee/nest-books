import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { booksProviders } from './books/books.providers';
import { ConfigModule } from '@nestjs/config'; // env

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController, BooksController],
  providers: [BooksService, ...booksProviders],
})
export class AppModule {}
