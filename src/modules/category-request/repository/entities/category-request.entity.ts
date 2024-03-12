import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'

export const CategoryRequestDatabaseName = 'category_requests'

@DatabaseEntity({ collection: CategoryRequestDatabaseName })
export class CategoryRequestEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    index: true,
    unique: true,
    required: true,
    ref: UserEntity.name,
  })
  user: string

  @Prop({
    index: true,
    trim: true,
    type: String,
    required: true,
  })
  name: string

  @Prop({
    index: true,
    trim: true,
    type: String,
    required: true,
  })
  description: string
}

export const CategoryRequestSchema = SchemaFactory.createForClass(CategoryRequestEntity)

export type CategoryRequestDoc = CategoryRequestEntity & Document
