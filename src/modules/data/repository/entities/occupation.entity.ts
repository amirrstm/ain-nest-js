import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const OccupationDatabaseName = 'occupations'

@DatabaseEntity({ collection: OccupationDatabaseName })
export class OccupationEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: String, required: true, unique: true })
  name: string
}

export const OccupationSchema = SchemaFactory.createForClass(OccupationEntity)

export type OccupationDoc = OccupationEntity & Document

OccupationSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.name = this.name.trim()

  next()
})
