import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CategoryUpdateDto {
  @ApiProperty({
    required: true,
    description: 'Name of category',
    example: {
      en: faker.internet.displayName(),
    },
  })
  @Type(() => Object)
  readonly name: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Description of category',
    example: {
      en: faker.lorem.sentence(),
    },
  })
  @Type(() => Object)
  readonly description: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Max tokens for category',
    example: faker.number.int(),
  })
  readonly maxTokens: number

  @ApiProperty({
    required: false,
    description: 'Meta Info for category',
    example: {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
    },
  })
  @Type(() => Object)
  readonly meta?: Record<string, any>

  @ApiProperty({
    required: true,
    description: 'Active flag of category',
    example: true,
  })
  readonly isActive: boolean
}
