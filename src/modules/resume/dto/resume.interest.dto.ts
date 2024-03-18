import { IsOptional, IsString, IsArray, ArrayMinSize } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeInterestDTO {
  @ApiProperty({
    required: false,
    example: faker.lorem.words(2),
    description: 'Name of the interest',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
    example: [faker.lorem.word(), faker.lorem.word()],
    description: 'Keywords related to the interest',
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  keywords?: string[]
}
