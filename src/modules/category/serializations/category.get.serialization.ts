import { faker } from '@faker-js/faker'
import { Exclude } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export class CategoryGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    description: 'Name of category',
    example: faker.person.jobTitle(),
    required: true,
    nullable: false,
  })
  readonly name: string

  @ApiProperty({
    description: 'Description of category',
    example: faker.lorem.sentence(),
    required: false,
    nullable: true,
  })
  readonly description: string

  @ApiProperty({
    description: 'Slug of category',
    example: faker.lorem.text(),
    required: false,
    nullable: true,
  })
  readonly slug: string

  @ApiProperty({
    description: 'Active flag of category',
    example: true,
    required: true,
    nullable: false,
  })
  readonly isActive: boolean

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
