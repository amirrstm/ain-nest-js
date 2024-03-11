import { faker } from '@faker-js/faker'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, ValidateNested, IsUUID, IsEnum } from 'class-validator'

import { ENUM_CHAT_ROLE } from '../constants/chat.constant'

class ChatMessagesDto {
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

export class ChatCreateDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string

  @ApiProperty({
    required: true,
    description: 'Feedback of history',
    example: {
      role: ENUM_CHAT_ROLE.SYSTEM,
      content: faker.animal.bird(),
    },
    type: ChatMessagesDto,
  })
  @Type(() => ChatMessagesDto)
  @IsNotEmpty()
  @ValidateNested()
  readonly message: ChatMessagesDto
}
