import { IsString } from 'class-validator'

export class PostBookDto {
  @IsString()
  readonly name: string

  // @IsOptional() // 유효성검사 무시 (선택적인 인자)
  @IsString()
  readonly genre: string
}
