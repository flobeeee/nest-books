import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { bookProviders } from './book/book.providers';
import { ConfigModule } from '@nestjs/config'; // env

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController, BookController],
  providers: [BookService, ...bookProviders],
})
export class AppModule {}
