import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const PromptDatabaseName = 'category_prompts'

@DatabaseEntity({ collection: PromptDatabaseName })
export class PromptEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: Map, of: String, required: true })
  description: Record<string, string>

  @Prop({
    index: true,
    required: true,
    ref: CategoryEntity.name,
  })
  category: string

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean
}

export const PromptSchema = SchemaFactory.createForClass(PromptEntity)

export type PromptDoc = PromptEntity & Document
