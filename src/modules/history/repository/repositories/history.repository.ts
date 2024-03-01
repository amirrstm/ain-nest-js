import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { InputEntity } from 'src/modules/inputs/repository/entities/input.entity'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'

import { HistoryDoc, HistoryEntity } from '../entities/history.entity'

@Injectable()
export class HistoryRepository extends DatabaseMongoUUIDRepositoryAbstract<HistoryEntity, HistoryDoc> {
  constructor(
    @DatabaseModel(HistoryEntity.name)
    private readonly historyModel: Model<HistoryEntity>
  ) {
    super(historyModel, [
      {
        path: 'inputValues.input',
        localField: 'inputValues.input',
        foreignField: '_id',
        model: InputEntity.name,
      },
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
      },
      {
        path: 'category',
        localField: 'category',
        foreignField: '_id',
        model: CategoryEntity.name,
      },
    ])
  }
}
