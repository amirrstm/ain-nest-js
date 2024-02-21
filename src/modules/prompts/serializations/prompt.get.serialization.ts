import { faker } from '@faker-js/faker'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude, Transform, Type } from 'class-transformer'
import { IsObject } from 'class-validator'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { CategoryGetSerialization } from 'src/modules/category/serializations/category.get.serialization'

export class PromptGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    description: 'Description Of Prompt',
    example: {
      en: faker.lorem.sentence(),
    },
    required: true,
    nullable: false,
  })
  @IsObject()
  readonly description: Record<string, string>

  @ApiProperty({
    description: 'Active flag of prompt',
    example: true,
    required: true,
    nullable: false,
  })
  readonly isActive: boolean

  @ApiProperty({
    required: true,
    nullable: false,
    type: CategoryGetSerialization,
  })
  @Type(() => CategoryGetSerialization)
  readonly category: CategoryGetSerialization

  @ApiProperty({
    description: 'Date created at',
    example: faker.date.recent(),
    required: true,
    nullable: false,
  })
  readonly createdAt: Date

  @ApiProperty({
    description: 'Date updated at',
    example: faker.date.recent(),
    required: true,
    nullable: false,
  })
  readonly updatedAt: Date

  @ApiHideProperty()
  @Exclude()
  readonly deletedAt?: Date
}
