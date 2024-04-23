import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { OccupationDoc, OccupationEntity } from '../entities/occupation.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class OccupationRepository extends DatabaseMongoUUIDRepositoryAbstract<OccupationEntity, OccupationDoc> {
  constructor(
    @DatabaseModel(OccupationEntity.name)
    private readonly occupationModel: Model<OccupationEntity>
  ) {
    super(occupationModel)
  }
}
