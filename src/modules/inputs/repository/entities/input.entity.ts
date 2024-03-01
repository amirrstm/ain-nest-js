import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ENUM_INPUT_TYPE } from '../../constants/input.enum.constant'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

export const InputDatabaseName = 'category_inputs'

@DatabaseEntity({ collection: InputDatabaseName })
export class InputEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: Map, of: String, required: true })
  title: Record<string, string>

  @Prop({ type: Map, of: String, required: true })
  placeholder: Record<string, string>

  @Prop({ type: Map, of: String, required: false })
  description?: Record<string, string>

  @Prop({
    required: true,
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  name: string

  @Prop({
    required: true,
    enum: ENUM_INPUT_TYPE,
  })
  type: ENUM_INPUT_TYPE

  @Prop({
    index: true,
    required: true,
    default: false,
    type: Boolean,
  })
  multiline: boolean

  @Prop({
    index: true,
    required: true,
    default: false,
    type: Boolean,
  })
  isRequired: boolean

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

export const InputSchema = SchemaFactory.createForClass(InputEntity)

export type InputDoc = InputEntity & Document
