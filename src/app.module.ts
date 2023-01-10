import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config' // env
import { BooksModule } from './books/books.module'

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), BooksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
