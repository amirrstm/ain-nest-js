import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ChatService } from '../services/chat.service'
import { ChatDoc } from '../repository/entities/chat.entity'

@Injectable()
export class ChatPutToRequestGuard implements CanActivate {
  constructor(private readonly chatService: ChatService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __chat: ChatDoc }>()
    const { params } = request
    const { chat } = params

    const check: ChatDoc = await this.chatService.findOneById(chat)
    request.__chat = check

    return true
  }
}
