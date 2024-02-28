import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { PlanDoc, PlanEntity } from '../entities/plan.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class PlanRepository extends DatabaseMongoUUIDRepositoryAbstract<PlanEntity, PlanDoc> {
  constructor(
    @DatabaseModel(PlanEntity.name)
    private readonly planModel: Model<PlanEntity>
  ) {
    super(planModel)
  }
}
