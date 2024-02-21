import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CategoryDoc } from '../repository/entities/category.entity'
import { ENUM_CATEGORY_STATUS_CODE_ERROR } from '../constants/category.status-code.constant'

@Injectable()
export class CategoryNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __category } = context.switchToHttp().getRequest<IRequestApp & { __category: CategoryDoc }>()

    if (!__category) {
      throw new NotFoundException({
        statusCode: ENUM_CATEGORY_STATUS_CODE_ERROR.CATEGORY_NOT_FOUND_ERROR,
        message: 'category.error.notFound',
      })
    }

    return true
  }
}
