import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const SkillDatabaseName = 'skills'

@DatabaseEntity({ collection: SkillDatabaseName })
export class SkillEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: String, required: true, unique: true })
  name: string
}

export const SkillSchema = SchemaFactory.createForClass(SkillEntity)

export type SkillDoc = SkillEntity & Document

SkillSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.name = this.name.trim()

  next()
})
