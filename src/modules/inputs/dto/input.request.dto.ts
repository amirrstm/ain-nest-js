import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class InputRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  input: string
}

export class InputCategoryRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  category: string
}
