import { faker } from '@faker-js/faker'
import { Exclude, Type } from 'class-transformer'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { ENUM_CHAT_ROLE } from '../constants/chat.constant'
import { UserGetSerialization } from 'src/modules/user/serializations/user.get.serialization'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export class ChatMessagesSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    enum: ENUM_CHAT_ROLE,
  })
  role: ENUM_CHAT_ROLE

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Content of message',
    example: faker.person.jobTitle(),
  })
  content: string
}

export class ChatGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: UserGetSerialization,
  })
  @Type(() => UserGetSerialization)
  readonly user: UserGetSerialization

  @ApiProperty({
    default: [],
    required: true,
    nullable: false,
    type: ChatMessagesSerialization,
  })
  @Type(() => ChatMessagesSerialization)
  readonly messages: ChatMessagesSerialization

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
