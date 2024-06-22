import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

import { IUserPlanUsed } from '../../interfaces/user-plan.interface'
import { PlanEntity } from 'src/modules/plan/repository/entities/plan.entity'
import { UserEntity } from 'src/modules/user/repository/entities/user.entity'

export const UserPlanDatabaseName = 'user_plans'

@DatabaseEntity({ collection: UserPlanDatabaseName })
export class UserPlanEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    index: true,
    required: true,
    ref: PlanEntity.name,
  })
  plan: string

  @Prop({
    index: true,
    required: true,
    ref: UserEntity.name,
  })
  user: string

  @Prop({
    type: Date,
    required: true,
  })
  planExpired: Date

  @Prop({
    _id: false,
    required: true,
    type: {
      generation: {
        default: 0,
        type: Number,
        required: true,
      },
      resumeAI: {
        default: 0,
        type: Number,
        required: true,
      },
      resumeVoice: {
        default: 0,
        type: Number,
        required: true,
      },
      resumeCustom: {
        default: 0,
        type: Number,
        required: true,
      },
    },
  })
  used: IUserPlanUsed
}

export const UserPlanSchema = SchemaFactory.createForClass(UserPlanEntity)

export type UserPlanDoc = UserPlanEntity & Document
