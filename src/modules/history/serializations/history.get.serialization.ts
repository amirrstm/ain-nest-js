import { faker } from '@faker-js/faker'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { CategoryGetSerialization } from 'src/modules/category/serializations/category.get.serialization'
import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization'
import { InputGetSerialization } from 'src/modules/inputs/serializations/input.get.serialization'

export class HistoryInputValuesSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: InputGetSerialization,
  })
  @Type(() => InputGetSerialization)
  input: InputGetSerialization

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Input Value',

    example: faker.person.jobTitle(),
  })
  value: string
}

export class HistoryGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: UserGetSerialization,
  })
  @Type(() => UserGetSerialization)
  readonly user: UserGetSerialization

  @ApiProperty({
    required: true,
    nullable: false,
    type: CategoryGetSerialization,
  })
  @Type(() => CategoryGetSerialization)
  readonly category: CategoryGetSerialization

  @ApiProperty({
    required: true,
    nullable: false,
    default: [],
    type: HistoryInputValuesSerialization,
  })
  @Type(() => HistoryInputValuesSerialization)
  readonly inputValues: HistoryInputValuesSerialization

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
