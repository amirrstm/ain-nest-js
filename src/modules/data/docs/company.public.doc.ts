import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { CompanyGetSerialization } from '../serializations/company.get.serialization'

export function CompanyPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get companies',
    }),
    DocResponsePaging<CompanyGetSerialization>('data.company.get', {
      serialization: CompanyGetSerialization,
    })
  )
}
