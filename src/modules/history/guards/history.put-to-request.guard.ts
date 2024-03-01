import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { HistoryService } from '../services/history.service'
import { HistoryDoc } from '../repository/entities/history.entity'

@Injectable()
export class HistoryPutToRequestGuard implements CanActivate {
  constructor(private readonly historyService: HistoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __history: HistoryDoc }>()
    const { params } = request
    const { history } = params

    const check: HistoryDoc = await this.historyService.findOneById(history)
    request.__history = check

    return true
  }
}
