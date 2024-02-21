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
