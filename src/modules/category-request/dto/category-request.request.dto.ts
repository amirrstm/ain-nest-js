import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CategoryRequestRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  @Type(() => String)
  category_request: string
}
