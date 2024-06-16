import { faker } from '@faker-js/faker'

import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsUUID, ValidateNested } from 'class-validator'
import { TemplateDefaultSettingsDTO } from 'src/modules/template/dtos/template.create.dto'
import { ITemplateDefaultSettings } from 'src/modules/template/interfaces/template.interface'

export class ResumeCreateDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly template: string

  @ApiProperty({
    required: true,
    example: faker.lorem.text(),
  })
  @IsNotEmpty()
  readonly title: string

  @ApiProperty({
    required: true,
    example: faker.lorem.text(),
  })
  @IsNotEmpty()
  readonly lang: string

  @ApiProperty({
    required: false,
    description: 'Default settings of template',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TemplateDefaultSettingsDTO)
  templateSettings?: ITemplateDefaultSettings
}
