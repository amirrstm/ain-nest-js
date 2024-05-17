import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { CompanyDoc, CompanyEntity } from '../entities/company.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class CompanyRepository extends DatabaseMongoUUIDRepositoryAbstract<CompanyEntity, CompanyDoc> {
  constructor(
    @DatabaseModel(CompanyEntity.name)
    private readonly companyModel: Model<CompanyEntity>
  ) {
    super(companyModel)
  }
}
