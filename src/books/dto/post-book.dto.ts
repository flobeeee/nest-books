import { IsString } from 'class-validator'

export class PostBookDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly genre: string
}
