import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { ToneDoc, ToneEntity } from '../entities/tone.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class ToneRepository extends DatabaseMongoUUIDRepositoryAbstract<ToneEntity, ToneDoc> {
  constructor(
    @DatabaseModel(ToneEntity.name)
    private readonly toneModel: Model<ToneEntity>
  ) {
    super(toneModel)
  }
}
