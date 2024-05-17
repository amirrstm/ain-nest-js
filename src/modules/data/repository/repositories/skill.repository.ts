import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { SkillDoc, SkillEntity } from '../entities/skill.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class SkillRepository extends DatabaseMongoUUIDRepositoryAbstract<SkillEntity, SkillDoc> {
  constructor(
    @DatabaseModel(SkillEntity.name)
    private readonly skillModel: Model<SkillEntity>
  ) {
    super(skillModel)
  }
}
