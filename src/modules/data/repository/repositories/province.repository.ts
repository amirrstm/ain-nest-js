import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { ProvinceDoc, ProvinceEntity } from '../entities/province.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class ProvinceRepository extends DatabaseMongoUUIDRepositoryAbstract<ProvinceEntity, ProvinceDoc> {
  constructor(
    @DatabaseModel(ProvinceEntity.name)
    private readonly provinceModel: Model<ProvinceEntity>
  ) {
    super(provinceModel)
  }
}
