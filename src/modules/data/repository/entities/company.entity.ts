import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const CompanyDatabaseName = 'companies'

@DatabaseEntity({ collection: CompanyDatabaseName })
export class CompanyEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: String, required: true, unique: true })
  name: string
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity)

export type CompanyDoc = CompanyEntity & Document

CompanySchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.name = this.name.trim()

  next()
})
