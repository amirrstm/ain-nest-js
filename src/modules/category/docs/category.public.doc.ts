import { applyDecorators } from '@nestjs/common'

import { Doc, DocRequest, DocResponse, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'
import { CategoryGetSerialization } from '../serializations/category.get.serialization'
import { CategoryDocParamsId } from '../constants/category.doc.constant'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

export function CategoryPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of categories',
    }),
    DocResponsePaging<CategoryGetSerialization>('category.get', {
      serialization: CategoryGetSerialization,
    })
  )
}

export function CategoryPublicGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a category',
    }),
    DocRequest({ params: CategoryDocParamsId }),
    DocResponse<ResponseIdSerialization>('category.get', {
      serialization: CategoryGetSerialization,
    })
  )
}
