import { faker } from '@faker-js/faker'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export class ProvinceCityGetSerialization {
  @ApiProperty({
    description: 'Name of City',
    example: faker.location.city(),
    required: true,
    nullable: false,
  })
  readonly name: string

  @ApiProperty({
    description: 'Latitude of City',
    example: faker.location.latitude(),
    required: true,
    nullable: false,
  })
  readonly latitude: number

  @ApiProperty({
    description: 'Longitude of City',
    example: faker.location.longitude(),
    required: true,
    nullable: false,
  })
  readonly longitude: number
}

export class ProvinceGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    description: 'Name of Province',
    example: faker.location.city(),
    required: true,
    nullable: false,
  })
  readonly name: string

  @ApiProperty({
    description: 'City list of province',
    example: [
      {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        name: { en: faker.internet.displayName() },
      },
    ],
    required: true,
    nullable: false,
  })
  @Type(() => ProvinceCityGetSerialization)
  readonly cities: ProvinceCityGetSerialization

  @ApiProperty({
    description: 'Latitude of Province',
    example: faker.location.latitude(),
    required: true,
    nullable: false,
  })
  readonly latitude: number

  @ApiProperty({
    description: 'Longitude of Province',
    example: faker.location.longitude(),
    required: true,
    nullable: false,
  })
  readonly longitude: number

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
