import { IsOptional, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeAwardDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(3),
    description: 'Title of the award',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Date the award was received',
  })
  @IsOptional()
  @IsDateString()
  date?: Date

  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Entity or organization presenting the award',
  })
  @IsOptional()
  @IsString()
  awarder?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of the award',
  })
  @IsOptional()
  @IsString()
  summary?: string
}
