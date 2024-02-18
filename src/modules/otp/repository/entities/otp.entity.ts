import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const OtpDatabaseName = 'otps'

@DatabaseEntity({ collection: OtpDatabaseName })
export class OtpEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    trim: true,
    type: String,
    maxlength: 6,
  })
  code: string

  @Prop({
    index: true,
    unique: true,
    required: true,
    ref: UserEntity.name,
  })
  user: string

  @Prop({
    required: true,
    default: false,
    index: true,
    type: Boolean,
  })
  isActive: boolean

  @Prop({
    required: false,
    index: true,
    type: Date,
  })
  expiredAt: Date
}

export const OtpSchema = SchemaFactory.createForClass(OtpEntity)

export type OtpDoc = OtpEntity & Document
