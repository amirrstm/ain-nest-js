import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class ChatRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  chat: string
}
