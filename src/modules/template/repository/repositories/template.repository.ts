import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { TemplateDoc, TemplateEntity } from '../entities/template.entity'

@Injectable()
export class TemplateRepository extends DatabaseMongoUUIDRepositoryAbstract<TemplateEntity, TemplateDoc> {
  constructor(
    @DatabaseModel(TemplateEntity.name)
    private readonly templateModel: Model<TemplateEntity>
  ) {
    super(templateModel)
  }
}
