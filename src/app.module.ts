import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config' // env
import { BooksModule } from './books/books.module'
import { BooksService } from './books/books.service'

// 스프링과 비슷함. 제어의 역전 IOC, DI 참고
// 모듈이 Nestjs의 핵심이라 모듈 더 공부하기
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), BooksModule],
  controllers: [AppController],
  providers: [BooksService], // 메모리에 미리 올려둔다 (주소지 선언), 주입을 하기위해 사용, new 선언하기 귀찮아서
})
export class AppModule {}
