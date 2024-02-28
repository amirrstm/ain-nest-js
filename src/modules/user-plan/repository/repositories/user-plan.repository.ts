import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { PlanEntity } from 'src/modules/plan/repository/entities/plan.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { UserPlanDoc, UserPlanEntity } from '../entities/user-plan.entity'

@Injectable()
export class UserPlanRepository extends DatabaseMongoUUIDRepositoryAbstract<UserPlanEntity, UserPlanDoc> {
  constructor(
    @DatabaseModel(UserPlanEntity.name)
    private readonly userPlanModel: Model<UserPlanEntity>
  ) {
    super(userPlanModel, [
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
      },
      {
        path: 'plan',
        localField: 'plan',
        foreignField: '_id',
        model: PlanEntity.name,
      },
    ])
  }
}
