import { IsNotEmpty, IsUUID } from 'class-validator'

export class TemplateRequestDto {
  @IsNotEmpty()
  @IsUUID('4')
  template: string
}
