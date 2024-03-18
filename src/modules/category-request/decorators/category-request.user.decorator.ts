import { applyDecorators, UseGuards } from '@nestjs/common'

import { CategoryRequestNotFoundGuard } from '../guards/category-request.not-found.guard'
import { CategoryRequestPutToRequestGuard } from '../guards/category-request.put-to-request.guard'

export function CategoryRequestUserGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(CategoryRequestPutToRequestGuard, CategoryRequestNotFoundGuard))
}
