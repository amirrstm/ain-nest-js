import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { StudyFieldDoc, StudyFieldEntity } from '../entities/study-field.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class StudyFieldRepository extends DatabaseMongoUUIDRepositoryAbstract<StudyFieldEntity, StudyFieldDoc> {
  constructor(
    @DatabaseModel(StudyFieldEntity.name)
    private readonly studyFieldModel: Model<StudyFieldEntity>
  ) {
    super(studyFieldModel)
  }
}
