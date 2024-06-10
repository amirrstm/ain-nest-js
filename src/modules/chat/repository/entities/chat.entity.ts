import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'

import { ENUM_CHAT_ROLE } from '../../constants/chat.constant'
import { IChatMessagesValues } from '../../interfaces/chat.interface'

export const ChatDatabaseName = 'chats'

@DatabaseEntity({ collection: ChatDatabaseName })
export class ChatEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    index: true,
    unique: true,
    required: true,
    ref: UserEntity.name,
  })
  user: string

  @Prop({
    _id: false,
    required: true,
    default: [],
    type: [
      {
        time: {
          type: Date,
          required: false,
        },
        role: {
          type: String,
          required: true,
          enum: ENUM_CHAT_ROLE,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  })
  messages: IChatMessagesValues[]
}

export const ChatSchema = SchemaFactory.createForClass(ChatEntity)

export type ChatDoc = ChatEntity & Document
