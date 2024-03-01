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

import { HistoryCreateDto } from '../dto/history.create.dto'
import { HistoryDocParamsId } from '../constants/history.doc.constant'
import { HistoryGetSerialization } from '../serializations/history.get.serialization'

export function HistoryAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of histories',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<HistoryGetSerialization>('history.get', {
      serialization: HistoryGetSerialization,
    })
  )
}

export function HistoryAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a history',
    }),
    DocRequest({ params: HistoryDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('history.get', {
      serialization: HistoryGetSerialization,
    })
  )
}

export function HistoryAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a history',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: HistoryCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('history.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function HistoryAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a history',
    }),
    DocRequest({
      params: HistoryDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('history.delete')
  )
}
