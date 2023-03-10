import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 인자로 받는 것만 들어오게 할 수 있음
      forbidNonWhitelisted: true, // 메세지로 해당 인자는 사용할 수 없다고 안내함
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Books example')
    .setDescription('The books API description')
    .setVersion('1.0')
    .addTag('books')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
