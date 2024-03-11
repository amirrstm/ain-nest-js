import { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity'

import { ChatDoc, ChatEntity } from '../repository/entities/chat.entity'
import { ENUM_CHAT_ROLE } from '../constants/chat.constant'

export interface IChatEntity extends Omit<ChatEntity, 'user'> {
  user: UserEntity
}

export interface IChatDoc extends Omit<ChatDoc, 'user'> {
  user: UserDoc
}

export interface IChatMessagesValues {
  time?: Date
  content: string
  role: ENUM_CHAT_ROLE
}
