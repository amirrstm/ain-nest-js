import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PLAN_IS_ACTIVE_META_KEY } from '../constants/plan.constant'
import { PlanDoc } from '../repository/entities/plan.entity'
import { ENUM_PLAN_STATUS_CODE_ERROR } from '../constants/plan.status-code.constant'

@Injectable()
export class PlanActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(PLAN_IS_ACTIVE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!required) {
      return true
    }

    const { __plan } = context.switchToHttp().getRequest<IRequestApp & { __plan: PlanDoc }>()

    if (!required.includes(__plan.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_PLAN_STATUS_CODE_ERROR.PLAN_INACTIVE_ERROR,
        message: 'plan.error.isActiveInvalid',
      })
    }
    return true
  }
}
