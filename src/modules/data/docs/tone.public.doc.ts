import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { ToneGetSerialization } from '../serializations/tone.get.serialization'

export function TonePublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get tones',
    }),
    DocResponsePaging<ToneGetSerialization>('data.tone.get', {
      serialization: ToneGetSerialization,
    })
  )
}
