import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'
import { CategoryGetSerialization } from '../serializations/category.get.serialization'

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
