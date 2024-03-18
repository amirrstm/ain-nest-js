import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class ResumeRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  resume: string
}
