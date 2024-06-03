import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const ToneDatabaseName = 'voice-tones'

@DatabaseEntity({ collection: ToneDatabaseName })
export class ToneEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: Map, of: String, required: true })
  name: Record<string, string>
}

export const ToneSchema = SchemaFactory.createForClass(ToneEntity)

export type ToneDoc = ToneEntity & Document
