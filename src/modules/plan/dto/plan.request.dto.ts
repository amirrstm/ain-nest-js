import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class PlanRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  plan: string
}
