import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBookDto {
  @ApiProperty({
    example: '삼국지',
    description: '도서 명',
  })
  @IsString()
  readonly name: string

  @ApiProperty({
    example: '무협',
    description: '장르',
  })
  @IsString()
  readonly genre: string
}
