import { applyDecorators } from '@nestjs/common'

import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { Doc, DocRequest, DocResponse, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { ProvinceDocParamsId } from '../constants/province.doc.constant'
import { ProvinceGetSerialization } from '../serializations/province.get.serialization'

export function ProvincePublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of provinces',
    }),
    DocResponsePaging<ProvinceGetSerialization>('data.province.get', {
      serialization: ProvinceGetSerialization,
    })
  )
}

export function ProvincePublicGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a Province',
    }),
    DocRequest({ params: ProvinceDocParamsId }),
    DocResponse<ResponseIdSerialization>('data.province.get', {
      serialization: ProvinceGetSerialization,
    })
  )
}
