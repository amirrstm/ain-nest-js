import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PLAN_IS_ACTIVE_META_KEY } from '../constants/plan.constant'
import { PlanPutToRequestGuard } from '../guards/plan.put-to-request.guard'
import { PlanNotFoundGuard } from '../guards/plan.not-found.guard'
import { PlanDoc } from '../repository/entities/plan.entity'

export function PlanAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(PlanPutToRequestGuard, PlanNotFoundGuard))
}

export function PlanAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(PlanPutToRequestGuard, PlanNotFoundGuard),
    SetMetadata(PLAN_IS_ACTIVE_META_KEY, [true])
  )
}

export const GetPlan = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __plan } = ctx.switchToHttp().getRequest<IRequestApp & { __plan: PlanDoc }>()
  return (returnPlain ? __plan.toObject() : __plan) as T
})
