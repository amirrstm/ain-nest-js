import { faker } from '@faker-js/faker'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export class ResumeGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: UserGetSerialization,
  })
  @Type(() => UserGetSerialization)
  readonly user: UserGetSerialization

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
