import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { BooksService } from './books/books.service'
@Controller()
export class AppController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({
    summary: 'Hello World',
    description: 'API 호출 상태를 확인한다.',
  })
  async getHello(): Promise<string> {
    const data = await this.booksService.findAll(null)
    console.log(data)
    return 'Hello World!'
  }
}
