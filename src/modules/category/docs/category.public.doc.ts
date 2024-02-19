import { applyDecorators } from '@nestjs/common'

import { Doc } from 'src/common/doc/decorators/doc.decorator'

export function CategoryPublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of categories',
    })
  )
}
