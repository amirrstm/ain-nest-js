import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { HistoryPutToRequestGuard } from '../guards/history.put-to-request.guard'
import { HistoryNotFoundGuard } from '../guards/history.not-found.guard'
import { HistoryDoc } from '../repository/entities/history.entity'

export function HistoryAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(HistoryPutToRequestGuard, HistoryNotFoundGuard))
}

export const GetHistory = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __history } = ctx.switchToHttp().getRequest<IRequestApp & { __history: HistoryDoc }>()
  return (returnPlain ? __history.toObject() : __history) as T
})
