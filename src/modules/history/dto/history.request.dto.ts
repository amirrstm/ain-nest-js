import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class HistoryRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  history: string
}
