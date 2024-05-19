import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class ResumeTemplateSettingsDTO {
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
