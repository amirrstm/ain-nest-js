import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PlanRepository } from './repositories/plan.repository'
import { PlanEntity, PlanSchema } from './entities/plan.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [PlanRepository],
  providers: [PlanRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: PlanEntity.name,
          schema: PlanSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class PlanRepositoryModule {}
