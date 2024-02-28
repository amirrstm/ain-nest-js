import { Module } from '@nestjs/common'

import { UserPlanService } from './services/user-plan.service'
import { UserPlanRepositoryModule } from './repository/user-plan.repository.module'

@Module({
  controllers: [],
  providers: [UserPlanService],
  exports: [UserPlanService],
  imports: [UserPlanRepositoryModule],
})
export class UserPlanModule {}
