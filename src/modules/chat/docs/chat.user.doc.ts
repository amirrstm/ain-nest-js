import { applyDecorators } from '@nestjs/common'
import { Doc, DocAuth, DocGuard, DocRequest, DocResponse } from 'src/common/doc/decorators/doc.decorator'

import { ChatMessagesDto } from '../dto/chat.message.dto'
import { ChatGetSerialization } from '../serializations/chat.get.serialization'
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant'

export function ChatUserGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get chat messages',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse<ChatGetSerialization>('chat.get', {
      serialization: ChatGetSerialization,
    })
  )
}

export function ChatUserCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create chat messages',
    }),
    DocRequest({
      body: ChatMessagesDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse<ChatGetSerialization>('chat.create', {
      serialization: ChatGetSerialization,
    })
  )
}

export function ChatUSerDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'Delete a chat history' }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse('chat.delete')
  )
}
