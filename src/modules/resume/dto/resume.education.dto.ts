import { IsOptional, IsString, IsDateString, IsBoolean, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

class Location {
  @ApiProperty({
    required: false,
    example: faker.location.city(),
    description: 'City of the institution',
  })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({
    required: false,
    example: faker.location.state(),
    description: 'State of the institution',
  })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({
    required: false,
    example: faker.location.country(),
    description: 'Country of the institution',
  })
  @IsOptional()
  @IsString()
  country?: string
}

export class ResumeEducationDTO {
  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Name of the educational institution',
  })
  @IsOptional()
  @IsString()
  institution?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.words(3),
    description: 'Area of study',
  })
  @IsOptional()
  @IsString()
  area?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.words(1),
    description: 'Type of study (e.g., Bachelor, Master)',
  })
  @IsOptional()
  @IsString()
  studyType?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.words(2),
    description: 'Field of study',
  })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Start date of education',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date

  @ApiProperty({
    required: false,
    example: faker.date.recent().toISOString(),
    description: 'End date of education',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date

  @ApiProperty({
    required: false,
    example: faker.number.int({ min: 0, max: 4 }).toString(),
    description: 'GPA or score obtained',
  })
  @IsOptional()
  @IsString()
  score?: string

  @ApiProperty({
    required: false,
    example: true,
    description: 'Indicates if the individual is still studying',
  })
  @IsOptional()
  @IsBoolean()
  stillStudying?: boolean

  @ApiProperty({
    required: false,
    description: 'Location of the educational institution',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location
}
