import { applyDecorators, UseGuards } from '@nestjs/common'

import { ChatNotFoundGuard } from '../guards/chat.not-found.guard'
import { ChatPutToRequestGuard } from '../guards/chat.put-to-request.guard'

export function ChatUserGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ChatPutToRequestGuard, ChatNotFoundGuard))
}
