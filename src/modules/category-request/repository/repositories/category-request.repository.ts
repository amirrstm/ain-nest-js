import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'

import { CategoryRequestDoc, CategoryRequestEntity } from '../entities/category-request.entity'

@Injectable()
export class CategoryRequestRepository extends DatabaseMongoUUIDRepositoryAbstract<
  CategoryRequestEntity,
  CategoryRequestDoc
> {
  constructor(
    @DatabaseModel(CategoryRequestEntity.name)
    private readonly requestModel: Model<CategoryRequestEntity>
  ) {
    super(requestModel, [
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
      },
    ])
  }
}
