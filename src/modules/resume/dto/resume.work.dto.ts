import { faker } from '@faker-js/faker'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsDateString, IsArray, ValidateNested } from 'class-validator'

class Location {
  @ApiProperty({
    required: false,
    example: faker.location.city(),
    description: 'City of the location',
  })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({
    required: false,
    example: faker.location.state(),
    description: 'State of the location',
  })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({
    required: false,
    example: faker.location.country(),
    description: 'Country of the location',
  })
  @IsOptional()
  @IsString()
  country?: string
}

export class ResumeWorkDTO {
  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Name of the workplace',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.person.jobTitle(),
    description: 'Position held at the workplace',
  })
  @IsOptional()
  @IsString()
  position?: string

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL of the workplace',
  })
  @IsOptional()
  @IsString()
  url?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Start date of employment',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date

  @ApiProperty({
    required: false,
    example: faker.date.recent().toISOString(),
    description: 'End date of employment',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of work experience',
  })
  @IsOptional()
  @IsString()
  summary?: string

  @ApiProperty({
    required: false,
    example: [faker.lorem.sentence()],
    description: 'List of highlights in the work experience',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[]

  @ApiProperty({
    required: false,
    description: 'Location of the workplace',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location
}
