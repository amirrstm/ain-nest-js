import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeLanguageDTO {
  @ApiProperty({
    required: false,
    example: faker.number.int({ min: 1, max: 5 }).toString(),
    description: 'Level of proficiency in the language (1 - Basic, 5 - Fluent)',
  })
  @IsOptional()
  @IsNumber()
  level?: number

  @ApiProperty({
    required: false,
    example: 'Fluent',
    description: 'Fluency level in the language (e.g., Basic, Intermediate, Fluent)',
  })
  @IsOptional()
  @IsString()
  fluency?: string

  @ApiProperty({
    required: false,
    example: 'English',
    description: 'Name of the language',
  })
  @IsOptional()
  @IsString()
  language?: string

  @ApiProperty({
    example: true,
    required: false,
    description: 'Indicates if proficiency level is provided',
  })
  @IsOptional()
  @IsBoolean()
  hasLevel?: boolean
}
