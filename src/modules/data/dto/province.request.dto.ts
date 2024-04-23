import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class ProvinceRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  province: string
}
