import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ChatPutToRequestGuard } from '../guards/chat.put-to-request.guard'
import { ChatNotFoundGuard } from '../guards/chat.not-found.guard'
import { ChatDoc } from '../repository/entities/chat.entity'

export function ChatAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ChatPutToRequestGuard, ChatNotFoundGuard))
}

export const GetChat = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __chat } = ctx.switchToHttp().getRequest<IRequestApp & { __chat: ChatDoc }>()
  return (returnPlain ? __chat.toObject() : __chat) as T
})
