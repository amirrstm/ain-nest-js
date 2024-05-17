import { faker } from '@faker-js/faker'

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class ResumeCreateDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string

  @ApiProperty({
    required: true,
    example: faker.lorem.text(),
  })
  @IsNotEmpty()
  readonly title: string

  @ApiProperty({
    required: false,
    example: faker.system.filePath(),
  })
  readonly filePath?: string
}
