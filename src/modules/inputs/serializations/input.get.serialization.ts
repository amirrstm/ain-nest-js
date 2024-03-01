import { faker } from '@faker-js/faker'
import { IsObject } from 'class-validator'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { CategoryGetSerialization } from 'src/modules/category/serializations/category.get.serialization'
import { ENUM_INPUT_TYPE } from '../constants/input.enum.constant'

export class InputGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    description: 'Title Of Input',
    example: {
      en: faker.lorem.text(),
    },
    required: true,
    nullable: false,
  })
  @IsObject()
  readonly title: Record<string, string>

  @ApiProperty({
    description: 'Placeholder Of Input',
    example: {
      en: faker.lorem.sentence(),
    },
    required: true,
    nullable: false,
  })
  @IsObject()
  readonly placeholder: Record<string, string>

  @ApiProperty({
    description: 'Description Of Input',
    example: {
      en: faker.lorem.sentence(),
    },
    required: true,
    nullable: false,
  })
  @IsObject()
  readonly description?: Record<string, string>

  @ApiProperty({
    description: 'Name Of Input',
    example: faker.lorem.word(),
    required: true,
    nullable: false,
  })
  readonly name: string

  @ApiProperty({
    required: true,
    nullable: false,
    example: ENUM_INPUT_TYPE.TEXT_INPUT,
  })
  readonly type: string

  @ApiProperty({
    required: true,
    nullable: false,
    example: false,
    description: 'Multiline flag of Input',
  })
  readonly multiline: boolean

  @ApiProperty({
    required: true,
    nullable: false,
    example: false,
    description: 'Required flag of Input',
  })
  readonly isRequired: boolean

  @ApiProperty({
    description: 'Active flag of Input',
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
