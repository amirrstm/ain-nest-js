import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CategoryRequestDoc } from '../repository/entities/category-request.entity'
import { ENUM_CATEGORY_REQUEST_STATUS_CODE_ERROR } from '../constants/category-request.status-code.constant'

@Injectable()
export class CategoryRequestNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __category_request } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __category_request: CategoryRequestDoc }>()

    if (!__category_request) {
      throw new NotFoundException({
        statusCode: ENUM_CATEGORY_REQUEST_STATUS_CODE_ERROR.CATEGORY_REQUEST_EXIST_ERROR,
        message: 'category-request.error.notFound',
      })
    }

    return true
  }
}
