import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const UniversityDatabaseName = 'universities'

@DatabaseEntity({ collection: UniversityDatabaseName })
export class UniversityEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: String, required: true, unique: true })
  name: string
}

export const UniversitySchema = SchemaFactory.createForClass(UniversityEntity)

export type UniversityDoc = UniversityEntity & Document

UniversitySchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.name = this.name.trim()

  next()
})
