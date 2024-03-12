import { applyDecorators } from '@nestjs/common'

import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { Doc, DocAuth, DocGuard, DocRequest, DocResponse } from 'src/common/doc/decorators/doc.decorator'

import { CategoryRequestCreateDto } from '../dto/category-request.create.dto'

export function CategoryRequestUserCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create category request',
    }),
    DocRequest({
      body: CategoryRequestCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse<ResponseIdSerialization>('category-request.create', {
      serialization: ResponseIdSerialization,
    })
  )
}
