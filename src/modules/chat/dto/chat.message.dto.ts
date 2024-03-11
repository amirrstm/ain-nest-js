import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum } from 'class-validator'

import { ENUM_CHAT_ROLE } from '../constants/chat.constant'

export class ChatMessagesDto {
  @ApiProperty({
    required: true,
    example: ENUM_CHAT_ROLE.SYSTEM,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ENUM_CHAT_ROLE)
  readonly role: ENUM_CHAT_ROLE

  @ApiProperty({
    required: true,
    description: 'Content of message',
    example: faker.animal.cetacean(),
  })
  @IsString()
  @IsNotEmpty()
  content: string
}
