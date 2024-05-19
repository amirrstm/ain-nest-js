import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { ResumeDoc, ResumeEntity } from '../entities/resume.entity'
import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { TemplateEntity } from 'src/modules/template/repository/entities/template.entity'

@Injectable()
export class ResumeRepository extends DatabaseMongoUUIDRepositoryAbstract<ResumeEntity, ResumeDoc> {
  constructor(
    @DatabaseModel(ResumeEntity.name)
    private readonly resumeModel: Model<ResumeEntity>
  ) {
    super(resumeModel, [
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
      },
      {
        path: 'template',
        localField: 'template',
        foreignField: '_id',
        model: TemplateEntity.name,
      },
    ])
  }
}
