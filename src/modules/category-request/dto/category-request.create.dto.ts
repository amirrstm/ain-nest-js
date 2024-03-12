import { faker } from '@faker-js/faker'

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CategoryRequestCreateDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string

  @ApiProperty({
    required: true,
    description: 'name of request',
    example: faker.animal.cetacean(),
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    required: false,
    description: 'description of request',
    example: faker.animal.cetacean(),
  })
  @IsString()
  @IsNotEmpty()
  description: string
}
