import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { UniversityDoc, UniversityEntity } from '../entities/university.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class UniversityRepository extends DatabaseMongoUUIDRepositoryAbstract<UniversityEntity, UniversityDoc> {
  constructor(
    @DatabaseModel(UniversityEntity.name)
    private readonly universityModel: Model<UniversityEntity>
  ) {
    super(universityModel)
  }
}
