import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const CategoryDatabaseName = 'categories'

@DatabaseEntity({ collection: CategoryDatabaseName })
export class CategoryEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: Map, of: String, required: true })
  name: Record<string, string>

  @Prop({ type: Map, of: String, required: true })
  description: Record<string, string>

  @Prop({
    required: false,
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  slug: string

  @Prop({
    index: true,
    sparse: true,
    required: false,
    ref: CategoryEntity.name,
  })
  parent?: string

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity)

export type CategoryDoc = CategoryEntity & Document
