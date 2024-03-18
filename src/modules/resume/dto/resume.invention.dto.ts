import { IsOptional, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeInventionDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(3),
    description: 'Name of the invention',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Date the invention was created',
  })
  @IsOptional()
  @IsDateString()
  date?: Date

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of the invention',
  })
  @IsOptional()
  @IsString()
  summary?: string

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL of the invention',
  })
  @IsOptional()
  @IsString()
  url?: string
}
