import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { TemplateDefaultSettingsDTO } from './template.create.dto'
import { ITemplateDefaultSettings } from '../interfaces/template.interface'

export class TemplateUpdateDto {
  @ApiProperty({
    required: false,
    nullable: true,
    description: 'path of template',
    example: faker.internet.url(),
  })
  @IsString()
  @Type(() => String)
  readonly path?: string

  @ApiProperty({
    required: false,
    nullable: true,
    description: 'image of template',
    example: faker.internet.url(),
  })
  @IsString()
  @Type(() => String)
  readonly image?: string

  @ApiProperty({
    required: false,
    nullable: true,
    example: faker.lorem.sentence(),
    description: 'Description of template',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly description: string

  @ApiProperty({
    required: false,
    description: 'Default settings of template',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TemplateDefaultSettingsDTO)
  defaultSettings?: ITemplateDefaultSettings
}
