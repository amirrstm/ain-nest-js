import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { UserPlanService } from 'src/modules/user-plan/services/user-plan.service'
import { JobConstant } from '../constants/job.constant'

@Injectable()
export class PlanJobService {
  constructor(private readonly userPlanService: UserPlanService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: JobConstant.USER_PLAN })
  async updateUserPlans() {
    const plans = await this.userPlanService.findAllExpired()
    if (!plans.length) return

    for (const plan of plans) {
      await this.userPlanService.updateExpire(plan)
    }
  }
}
