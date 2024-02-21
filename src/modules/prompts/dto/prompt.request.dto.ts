import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class PromptRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  prompt: string
}
