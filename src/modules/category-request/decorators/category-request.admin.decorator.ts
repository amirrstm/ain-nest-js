import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CategoryRequestPutToRequestGuard } from '../guards/category-request.put-to-request.guard'
import { CategoryRequestNotFoundGuard } from '../guards/category-request.not-found.guard'
import { CategoryRequestDoc } from '../repository/entities/category-request.entity'

export function CategoryRequestAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(CategoryRequestPutToRequestGuard, CategoryRequestNotFoundGuard))
}

export const GetCategoryRequest = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __category_request } = ctx
    .switchToHttp()
    .getRequest<IRequestApp & { __category_request: CategoryRequestDoc }>()
  return (returnPlain ? __category_request.toObject() : __category_request) as T
})
