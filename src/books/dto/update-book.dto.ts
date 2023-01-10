import { IsNumber, IsString } from 'class-validator'

export class UpdateBookDto {
  @IsNumber()
  readonly id: number

  @IsString()
  readonly name: string

  @IsString()
  readonly genre: string
}
