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

import { ProvinceCreateDto } from '../dto/province.create.dto'
import { ProvinceDocParamsId } from '../constants/province.doc.constant'
import { ProvinceGetSerialization } from '../serializations/province.get.serialization'

export function ProvinceAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of provinces',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<ProvinceGetSerialization>('data.province.get', {
      serialization: ProvinceGetSerialization,
    })
  )
}

export function ProvinceAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a Province',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocRequest({ params: ProvinceDocParamsId }),
    DocResponse<ResponseIdSerialization>('data.province.get', {
      serialization: ProvinceGetSerialization,
    })
  )
}

export function ProvinceAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a Province',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: ProvinceCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('data.province.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function ProvinceAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'delete a Province' }),
    DocRequest({ params: ProvinceDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse('data.province.delete')
  )
}
