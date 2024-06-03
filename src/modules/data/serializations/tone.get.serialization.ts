import { faker } from '@faker-js/faker'
import { Exclude } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export class ToneGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Name of Tone',
    example: faker.commerce.productName(),
  })
  readonly name: string

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
