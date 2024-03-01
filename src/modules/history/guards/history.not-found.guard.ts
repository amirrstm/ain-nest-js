import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { HistoryDoc } from '../repository/entities/history.entity'
import { ENUM_HISTORY_STATUS_CODE_ERROR } from '../constants/history.status-code.constant'

@Injectable()
export class HistoryNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __history } = context.switchToHttp().getRequest<IRequestApp & { __history: HistoryDoc }>()

    if (!__history) {
      throw new NotFoundException({
        statusCode: ENUM_HISTORY_STATUS_CODE_ERROR.HISTORY_EXIST_ERROR,
        message: 'history.error.notFound',
      })
    }

    return true
  }
}
