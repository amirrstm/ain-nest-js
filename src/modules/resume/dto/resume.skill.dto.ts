import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeSkillDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(2),
    description: 'Name of the skill',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: faker.number.int({ min: 1, max: 5 }).toString(),
    description: 'Proficiency level of the skill (1 - Basic, 5 - Expert)',
  })
  @IsOptional()
  @IsNumber()
  level?: number

  @ApiProperty({
    required: false,
    example: false,
    description: 'Indicates if proficiency level is provided',
  })
  @IsOptional()
  @IsBoolean()
  hasLevel?: boolean

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Description of the skill',
  })
  @IsOptional()
  @IsString()
  description?: string
}
