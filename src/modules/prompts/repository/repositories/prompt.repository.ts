import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { PromptDoc, PromptEntity } from '../entities/prompt.entity'

@Injectable()
export class PromptRepository extends DatabaseMongoUUIDRepositoryAbstract<PromptEntity, PromptDoc> {
  constructor(
    @DatabaseModel(PromptEntity.name)
    private readonly promptModel: Model<PromptEntity>
  ) {
    super(promptModel, {
      path: 'category',
      localField: 'category',
      foreignField: '_id',
      model: CategoryEntity.name,
    })
  }
}
