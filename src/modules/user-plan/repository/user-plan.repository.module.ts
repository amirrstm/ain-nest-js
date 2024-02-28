import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserPlanRepository } from './repositories/user-plan.repository'
import { UserPlanEntity, UserPlanSchema } from './entities/user-plan.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [UserPlanRepository],
  providers: [UserPlanRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserPlanEntity.name,
          schema: UserPlanSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class UserPlanRepositoryModule {}
