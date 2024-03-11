import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ChatRepository } from './repositories/chat.repository'
import { ChatEntity, ChatSchema } from './entities/chat.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [ChatRepository],
  providers: [ChatRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ChatEntity.name,
          schema: ChatSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class ChatRepositoryModule {}
