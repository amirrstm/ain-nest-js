import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { InputDoc, InputEntity } from '../entities/input.entity'

@Injectable()
export class InputRepository extends DatabaseMongoUUIDRepositoryAbstract<InputEntity, InputDoc> {
  constructor(
    @DatabaseModel(InputEntity.name)
    private readonly inputModel: Model<InputEntity>
  ) {
    super(inputModel, {
      path: 'category',
      localField: 'category',
      foreignField: '_id',
      model: CategoryEntity.name,
    })
  }
}
