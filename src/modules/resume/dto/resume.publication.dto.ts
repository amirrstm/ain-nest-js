import { IsOptional, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumePublicationDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(5),
    description: 'Name of the publication',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Publisher of the publication',
  })
  @IsOptional()
  @IsString()
  publisher?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Release date of the publication',
  })
  @IsOptional()
  @IsDateString()
  releaseDate?: Date

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL of the publication',
  })
  @IsOptional()
  @IsString()
  url?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of the publication',
  })
  @IsOptional()
  @IsString()
  summary?: string
}
