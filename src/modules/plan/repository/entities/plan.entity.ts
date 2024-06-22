import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'
import { PLAN_ENUM_MODEL } from '../../constants/plan.constant'
import { IPlanModel } from '../../interfaces/plan.interface'

export const PlanDatabaseName = 'plans'

@DatabaseEntity({ collection: PlanDatabaseName })
export class PlanEntity extends DatabaseMongoUUIDEntityAbstract {
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
    default: 0,
    type: Number,
    required: true,
  })
  generation: number

  @Prop({
    required: true,
    default: [],
    _id: false,
    type: [String],
  })
  features: string[]

  @Prop({
    default: 0,
    type: Number,
    required: true,
  })
  price: number

  @Prop({
    default: 0,
    type: Number,
    required: true,
  })
  resumeVoice: number

  @Prop({
    default: 0,
    type: Number,
    required: true,
  })
  resumeAI: number

  @Prop({
    default: 0,
    type: Number,
    required: true,
  })
  resumeCustom: number

  @Prop({
    required: true,
    default: true,
    type: Boolean,
  })
  offForAnnual: boolean

  @Prop({
    required: true,
    default: [],
    _id: false,
    type: [
      {
        type: {
          type: String,
          enum: PLAN_ENUM_MODEL,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  })
  models: IPlanModel[]

  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  isDefault: boolean

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean
}

export const PlanSchema = SchemaFactory.createForClass(PlanEntity)

export type PlanDoc = PlanEntity & Document
