import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { MaxLength, IsUUID, ValidateIf } from 'class-validator'

export class CategoryCreateDto {
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
    description: 'Max tokens for category',
    example: faker.number.int(),
  })
  readonly maxTokens: number

  @ApiProperty({
    required: true,
    description: 'Slug for category',
    example: faker.internet.displayName(),
  })
  @MaxLength(100)
  @Type(() => String)
  readonly slug: string

  @ApiProperty({
    nullable: true,
    required: false,
    example: faker.string.uuid(),
  })
  @ValidateIf(e => !!e.parentId)
  @IsUUID('4')
  readonly parentId?: string
}
