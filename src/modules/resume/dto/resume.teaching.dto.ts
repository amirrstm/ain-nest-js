import { IsOptional, IsString, IsDateString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

class Location {
  @ApiProperty({
    required: false,
    example: faker.location.city(),
    description: 'City of the teaching institution',
  })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({
    required: false,
    example: faker.location.state(),
    description: 'State of the teaching institution',
  })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({
    required: false,
    example: faker.location.country(),
    description: 'Country of the teaching institution',
  })
  @IsOptional()
  @IsString()
  country?: string
}

export class ResumeTeachingDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(3),
    description: 'Title of the teaching position',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Name of the teaching institution',
  })
  @IsOptional()
  @IsString()
  institution?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Date of teaching',
  })
  @IsOptional()
  @IsDateString()
  date?: Date

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of teaching experience',
  })
  @IsOptional()
  @IsString()
  summary?: string

  @ApiProperty({
    required: false,
    description: 'Location of the teaching institution',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location
}
