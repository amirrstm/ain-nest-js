import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant'
import {
  Doc,
  DocAuth,
  DocRequest,
  DocGuard,
  DocResponse,
  DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import { ChatCreateDto } from '../dto/chat.create.dto'
import { ChatDocParamsId } from '../constants/chat.doc.constant'
import { ChatGetSerialization } from '../serializations/chat.get.serialization'

export function ChatAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of chats',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<ChatGetSerialization>('chat.get', {
      serialization: ChatGetSerialization,
    })
  )
}

export function ChatAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a chat',
    }),
    DocRequest({ params: ChatDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('chat.get', {
      serialization: ChatGetSerialization,
    })
  )
}

export function ChatAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a chat',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: ChatCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('chat.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function ChatAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a chat',
    }),
    DocRequest({
      params: ChatDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('chat.delete')
  )
}
