import { faker } from '@faker-js/faker'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import { ENUM_TEMPLATE_TYPE } from '../constants/template.enum.constant'

export class TemplateGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Name of template',
    example: faker.person.jobTitle(),
  })
  readonly name: string

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.internet.url(),
    description: 'path of template',
  })
  readonly path: string

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.internet.url(),
    description: 'image of template',
  })
  readonly image: string

  @ApiProperty({
    required: false,
    nullable: true,
    example: faker.lorem.sentence(),
    description: 'Description of template',
  })
  readonly description?: string

  @ApiProperty({
    description: 'Active flag of template',
    example: true,
    required: true,
    nullable: false,
  })
  readonly isActive: boolean

  @ApiProperty({
    required: true,
    nullable: false,
    example: ENUM_TEMPLATE_TYPE.PDF,
    description: 'Representative for template type',
  })
  readonly type: ENUM_TEMPLATE_TYPE

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
