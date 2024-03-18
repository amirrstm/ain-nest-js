import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeReferenceDTO {
  @ApiProperty({
    required: false,
    example: faker.person.lastName(),
    description: 'Name of the reference',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.sentence(),
    description: 'Reference information',
  })
  @IsOptional()
  @IsString()
  reference?: string
}
