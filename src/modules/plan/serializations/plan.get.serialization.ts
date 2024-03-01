import { faker } from '@faker-js/faker'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { PLAN_ENUM_MODEL } from '../constants/plan.constant'

export class PlanGetModelSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Model type',
    enum: PLAN_ENUM_MODEL,
  })
  type: PLAN_ENUM_MODEL

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Model name',

    example: faker.person.jobTitle(),
  })
  name: string
}

export class PlanGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    description: 'Name of plan',
    example: faker.person.jobTitle(),
    required: true,
    nullable: false,
  })
  readonly name: string

  @ApiProperty({
    description: 'Description of plan',
    example: faker.lorem.sentence(),
    required: false,
    nullable: true,
  })
  readonly description: string

  @ApiProperty({
    description: 'Slug of plan',
    example: faker.lorem.text(),
    required: false,
    nullable: true,
  })
  readonly slug: string

  @ApiProperty({
    description: 'Generation count of plan',
    example: faker.number.int(),
    required: true,
    nullable: false,
  })
  readonly generations: number

  @ApiProperty({
    required: true,
    nullable: false,
    default: [],
    type: PlanGetModelSerialization,
  })
  @Type(() => PlanGetModelSerialization)
  readonly models: PlanGetModelSerialization

  @ApiProperty({
    description: 'Price of plan',
    example: faker.number.int(),
    required: true,
    nullable: false,
  })
  readonly price: number

  @ApiProperty({
    description: 'Features of plan',
    default: [],
    required: true,
    nullable: false,
    type: [String],
  })
  readonly features: string[]

  @ApiProperty({
    description: 'Active flag of plan',
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
