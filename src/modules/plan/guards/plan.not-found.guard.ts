import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PlanDoc } from '../repository/entities/plan.entity'
import { ENUM_PLAN_STATUS_CODE_ERROR } from '../constants/plan.status-code.constant'

@Injectable()
export class PlanNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __plan } = context.switchToHttp().getRequest<IRequestApp & { __plan: PlanDoc }>()

    if (!__plan) {
      throw new NotFoundException({
        statusCode: ENUM_PLAN_STATUS_CODE_ERROR.PLAN_EXIST_ERROR,
        message: 'plan.error.notFound',
      })
    }

    return true
  }
}
