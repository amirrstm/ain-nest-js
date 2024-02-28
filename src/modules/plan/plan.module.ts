import { Module } from '@nestjs/common'

import { PlanService } from './services/plan.service'
import { PlanRepositoryModule } from './repository/plan.repository.module'

@Module({
  controllers: [],
  providers: [PlanService],
  exports: [PlanService],
  imports: [PlanRepositoryModule],
})
export class PlanModule {}
