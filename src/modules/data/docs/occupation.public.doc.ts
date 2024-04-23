import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { OccupationGetSerialization } from '../serializations/occupation.get.serialization'

export function OccupationPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get occupations',
    }),
    DocResponsePaging<OccupationGetSerialization>('data.occupation.get', {
      serialization: OccupationGetSerialization,
    })
  )
}
