import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { CategoryDoc, CategoryEntity } from '../entities/category.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class CategoryRepository extends DatabaseMongoUUIDRepositoryAbstract<CategoryEntity, CategoryDoc> {
  constructor(
    @DatabaseModel(CategoryEntity.name)
    private readonly userModel: Model<CategoryEntity>
  ) {
    super(userModel, {
      path: 'category',
      localField: 'category',
      foreignField: '_id',
      model: CategoryEntity.name,
    })
  }
}
