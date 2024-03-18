import { IsOptional, IsString, IsDateString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeVolunteerDTO {
  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Name of the organization',
  })
  @IsOptional()
  @IsString()
  organization?: string

  @ApiProperty({
    required: false,
    example: faker.person.jobTitle(),
    description: 'Position or role in the organization',
  })
  @IsOptional()
  @IsString()
  position?: string

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL related to the volunteer work',
  })
  @IsOptional()
  @IsString()
  url?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Start date of the volunteer work',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date

  @ApiProperty({
    required: false,
    example: faker.date.recent().toISOString(),
    description: 'End date of the volunteer work',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of the volunteer work',
  })
  @IsOptional()
  @IsString()
  summary?: string

  @ApiProperty({
    required: false,
    example: [faker.lorem.sentence(), faker.lorem.sentence()],
    description: 'List of highlights or key achievements in the volunteer work',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[]
}
