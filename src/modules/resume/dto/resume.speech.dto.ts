import { IsOptional, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeSpeechDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(5),
    description: 'Name of the speech or presentation',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Date the speech or presentation was delivered',
  })
  @IsOptional()
  @IsDateString()
  date?: Date

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL related to the speech or presentation',
  })
  @IsOptional()
  @IsString()
  url?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of the speech or presentation',
  })
  @IsOptional()
  @IsString()
  summary?: string
}
