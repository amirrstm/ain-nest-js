import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ChatDoc } from '../repository/entities/chat.entity'
import { ENUM_CHAT_STATUS_CODE_ERROR } from '../constants/chat.status-code.constant'

@Injectable()
export class ChatNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __chat } = context.switchToHttp().getRequest<IRequestApp & { __chat: ChatDoc }>()

    if (!__chat) {
      throw new NotFoundException({
        statusCode: ENUM_CHAT_STATUS_CODE_ERROR.CHAT_EXIST_ERROR,
        message: 'chat.error.notFound',
      })
    }

    return true
  }
}
