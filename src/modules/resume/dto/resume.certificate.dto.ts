import { IsOptional, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeCertificateDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(3),
    description: 'Name of the certificate',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.date.past().toISOString(),
    description: 'Date the certificate was obtained',
  })
  @IsOptional()
  @IsDateString()
  date?: Date

  @ApiProperty({
    required: false,
    example: faker.company.name(),
    description: 'Issuer of the certificate',
  })
  @IsOptional()
  @IsString()
  issuer?: string

  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL of the certificate',
  })
  @IsOptional()
  @IsString()
  url?: string
}
