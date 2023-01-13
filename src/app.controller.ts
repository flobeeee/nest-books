import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Hello World',
    description: 'API 호출 상태를 확인한다.',
  })
  getHello(): string {
    return 'Hello World!'
  }
}
