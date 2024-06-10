import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'
import { ICategoryMeta } from '../../interfaces/category.interface'

export const CategoryDatabaseName = 'categories'

@DatabaseEntity({ collection: CategoryDatabaseName })
export class CategoryEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: Map, of: String, required: true })
  name: Record<string, string>

  @Prop({ type: Map, of: String, required: true })
  description: Record<string, string>

  @Prop({ type: Number, required: true })
  maxTokens: number

  @Prop({
    index: true,
    unique: true,
    required: true,
    type: String,
  })
  slug: string

  @Prop({
    index: true,
    sparse: true,
    required: false,
    ref: CategoryEntity.name,
  })
  parentId?: string

  @Prop({
    required: false,
    type: Schema.Types.Mixed,
  })
  meta?: ICategoryMeta

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
