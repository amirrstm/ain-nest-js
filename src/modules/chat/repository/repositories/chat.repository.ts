import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'

import { ChatDoc, ChatEntity } from '../entities/chat.entity'

@Injectable()
export class ChatRepository extends DatabaseMongoUUIDRepositoryAbstract<ChatEntity, ChatDoc> {
  constructor(
    @DatabaseModel(ChatEntity.name)
    private readonly chatModel: Model<ChatEntity>
  ) {
    super(chatModel, [
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
      },
    ])
  }
}
