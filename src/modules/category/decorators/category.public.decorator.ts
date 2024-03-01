import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CategoryPutToRequestGuard } from '../guards/category.put-to-request.guard'
import { CategoryNotFoundGuard } from '../guards/category.not-found.guard'
import { CategoryDoc } from '../repository/entities/category.entity'

export function CategoryPublicGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(CategoryPutToRequestGuard, CategoryNotFoundGuard))
}

export const GetCategory = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __category } = ctx.switchToHttp().getRequest<IRequestApp & { __category: CategoryDoc }>()
  return (returnPlain ? __category.toObject() : __category) as T
})
