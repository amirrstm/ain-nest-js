import { IsOptional, IsString, IsDateString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeProjectDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(3),
    description: 'Name of the project',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Start date of the project',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date

  @ApiProperty({
    required: false,
    example: faker.date.recent().toISOString(),
    description: 'End date of the project',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date

  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Organization or company involved in the project',
  })
  @IsOptional()
  @IsString()
  organization?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Description of the project',
  })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({
    required: false,
    example: [faker.lorem.sentence(), faker.lorem.sentence()],
    description: 'List of highlights or key achievements in the project',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[]

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL related to the project',
  })
  @IsOptional()
  @IsString()
  url?: string
}
