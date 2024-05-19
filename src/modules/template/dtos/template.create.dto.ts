import { faker } from '@faker-js/faker'
import { Type } from 'class-transformer'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsBoolean,
} from 'class-validator'

import { ENUM_TEMPLATE_TYPE } from '../constants/template.enum.constant'
import { TemplateUpdateDto } from './template.update.dto'
import { ITemplateDefaultSettings } from '../interfaces/template.interface'

export class TemplateCreateDto extends PartialType(TemplateUpdateDto) {
  @ApiProperty({
    required: true,
    description: 'Name of template',
    example: faker.person.jobTitle(),
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Type(() => String)
  readonly name: string

  @ApiProperty({
    required: true,
    description: 'Language of template',
    example: faker.location.countryCode(),
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly lang: string

  @ApiProperty({
    example: 'PDF',
    required: true,
    description: 'Representative for template type',
  })
  @IsEnum(ENUM_TEMPLATE_TYPE)
  @IsNotEmpty()
  readonly type: ENUM_TEMPLATE_TYPE

  @ApiProperty({
    required: false,
    description: 'Default settings of template',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TemplateDefaultSettingsDTO)
  defaultSettings?: ITemplateDefaultSettings
}

export class TemplateDefaultSettingsDTO {
  @ApiProperty({
    required: false,
    example: faker.color.hsl(),
    description: 'Color of the resume owner name',
  })
  @IsOptional()
  @IsString()
  nameColor?: string

  @ApiProperty({
    required: false,
    example: faker.color.hsl(),
    description: 'Color of the resume owner job title',
  })
  @IsOptional()
  @IsString()
  jobTitleColor?: string

  @ApiProperty({
    required: false,
    example: faker.color.hsl(),
    description: 'Color of the section title',
  })
  @IsOptional()
  @IsString()
  sectionTitleColor?: string

  @ApiProperty({
    required: false,
    example: faker.color.hsl(),
    description: 'Color of the places',
  })
  @IsOptional()
  @IsString()
  placesColor?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.word(6),
    description: 'Default font',
  })
  @IsOptional()
  @IsString()
  defaultFont?: string

  @ApiProperty({
    required: false,
    example: faker.datatype.boolean(),
    description: 'Rounded profile picture',
  })
  @IsOptional()
  @IsBoolean()
  roundedProfilePicture?: boolean

  @ApiProperty({
    required: false,
    example: faker.color.hsl(),
    description: 'Color of the skill bar',
  })
  @IsOptional()
  @IsString()
  skillBarColor?: string

  @ApiProperty({
    required: false,
    example: faker.datatype.boolean(),
    description: 'Hide information icon',
  })
  @IsOptional()
  @IsBoolean()
  hideInformationIcon?: boolean

  @ApiProperty({
    required: false,
    example: faker.lorem.word(6),
    description: 'Block margins',
  })
  @IsOptional()
  @IsString()
  blockMargins?: string
}
