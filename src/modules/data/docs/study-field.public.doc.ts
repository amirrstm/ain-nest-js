import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { StudyFieldGetSerialization } from '../serializations/study-field.get.serialization'

export function StudyFieldsPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get study fields',
    }),
    DocResponsePaging<StudyFieldGetSerialization>('data.studyField.get', {
      serialization: StudyFieldGetSerialization,
    })
  )
}
