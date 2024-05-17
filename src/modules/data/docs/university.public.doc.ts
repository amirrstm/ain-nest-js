import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { UniversityGetSerialization } from '../serializations/university.get.serialization'

export function UniversityPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get universities',
    }),
    DocResponsePaging<UniversityGetSerialization>('data.university.get', {
      serialization: UniversityGetSerialization,
    })
  )
}
