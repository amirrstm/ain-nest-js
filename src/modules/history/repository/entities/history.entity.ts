import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { InputEntity } from 'src/modules/inputs/repository/entities/input.entity'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'

import { IHistoryFeedback, IHistoryInputValues } from '../../interfaces/history.interface'

export const HistoryDatabaseName = 'histories'

@DatabaseEntity({ collection: HistoryDatabaseName })
export class HistoryEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    default: [],
    _id: false,
    type: [
      {
        input: {
          required: true,
          type: String,
          ref: InputEntity.name,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  })
  inputValues: IHistoryInputValues[]

  @Prop({
    type: String,
    required: false,
  })
  content: string

  @Prop({
    type: String,
    required: false,
  })
  rawContent: string

  @Prop({
    index: true,
    required: true,
    ref: UserEntity.name,
  })
  user: string

  @Prop({
    index: true,
    required: false,
    ref: CategoryEntity.name,
  })
  category?: string

  @Prop({
    _id: false,
    required: false,
    type: {
      liked: {
        type: Boolean,
        required: true,
      },
      text: {
        type: String,
        required: false,
      },
    },
  })
  feedback: IHistoryFeedback
}

export const HistorySchema = SchemaFactory.createForClass(HistoryEntity)

export type HistoryDoc = HistoryEntity & Document
