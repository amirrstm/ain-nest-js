import { Module } from '@nestjs/common'
import { PlanJobService } from '../services/plan.service'
import { UserPlanModule } from 'src/modules/user-plan/user-plan.module'

@Module({
  exports: [],
  controllers: [],
  imports: [UserPlanModule],
  providers: [PlanJobService],
})
export class JobsRouterModule {}
