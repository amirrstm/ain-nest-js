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

import { CategoryRequestCreateDto } from '../dto/category-request.create.dto'
import { CategoryRequestGetSerialization } from '../serializations/category-request.get.serialization'

export function CategoryRequestAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of category requests',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<CategoryRequestGetSerialization>('category-request.get', {
      serialization: CategoryRequestGetSerialization,
    })
  )
}

export function CategoryRequestAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a category request',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: CategoryRequestCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('category-request.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}
