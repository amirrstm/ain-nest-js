import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CategoryNotFoundGuard } from '../guards/category.not-found.guard'
import { CategoryDoc } from '../repository/entities/category.entity'
import { CategoryPutSlugToRequestGuard } from '../guards/category.put-slug-to-request.guard'

export function CategoryPublicGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(CategoryPutSlugToRequestGuard, CategoryNotFoundGuard))
}

export const GetCategoryBySlug = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __category } = ctx.switchToHttp().getRequest<IRequestApp & { __category: CategoryDoc }>()
  return (returnPlain ? __category.toObject() : __category) as T
})
