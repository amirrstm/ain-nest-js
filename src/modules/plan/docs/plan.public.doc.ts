import { applyDecorators } from '@nestjs/common'

import { Doc, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'
import { PlanGetSerialization } from '../serializations/plan.get.serialization'

export function PlanPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of plans',
    }),
    DocResponsePaging<PlanGetSerialization>('plan.get', {
      serialization: PlanGetSerialization,
    })
  )
}
