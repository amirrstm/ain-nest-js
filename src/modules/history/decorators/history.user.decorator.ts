import { applyDecorators, UseGuards } from '@nestjs/common'

import { HistoryNotFoundGuard } from '../guards/history.not-found.guard'
import { HistoryPutUsersToRequestGuard } from '../guards/history.put-users-to-request.guard'

export function HistoryUserGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(HistoryPutUsersToRequestGuard, HistoryNotFoundGuard))
}
