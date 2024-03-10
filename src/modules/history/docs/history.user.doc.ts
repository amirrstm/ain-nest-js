import { applyDecorators } from '@nestjs/common'
import { Doc, DocAuth, DocGuard, DocResponse, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { HistoryGetSerialization } from '../serializations/history.get.serialization'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export function HistoryUserListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of histories',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponsePaging<HistoryGetSerialization>('history.get', {
      serialization: HistoryGetSerialization,
    })
  )
}

export function HistoryUserDashboardDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get history for dashboard',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse<HistoryGetSerialization>('history.get', {
      serialization: HistoryGetSerialization,
    })
  )
}

export function HistoryUserFeedbackDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'submit feedback for history',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse<ResponseIdSerialization>('history.feedback', {
      serialization: ResponseIdSerialization,
    })
  )
}
