import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { faker } from '@faker-js/faker'

export class ResumeProfileDTO {
  @ApiProperty({
    required: true,
    example: 'LinkedIn',
    description: 'Name of the social network',
  })
  @IsOptional()
  @IsString()
  network?: string

  @ApiProperty({
    required: true,
    example: faker.internet.userName(),
    description: 'Username on the social network',
  })
  @IsOptional()
  @IsString()
  username?: string
}
