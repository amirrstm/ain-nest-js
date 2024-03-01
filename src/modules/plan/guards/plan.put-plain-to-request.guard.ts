import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PlanService } from '../services/plan.service'
import { PlanDoc } from '../repository/entities/plan.entity'

@Injectable()
export class PlanPutPlainToRequestGuard implements CanActivate {
  constructor(private readonly planService: PlanService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __plan: PlanDoc }>()
    const { params } = request
    const { plan } = params

    const check: PlanDoc = await this.planService.findOneById(plan, { plainObject: true })
    request.__plan = check

    return true
  }
}
