import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CATEGORY_IS_ACTIVE_META_KEY } from '../constants/category.constant'
import { CategoryDoc } from '../repository/entities/category.entity'
import { ENUM_CATEGORY_STATUS_CODE_ERROR } from '../constants/category.status-code.constant'

@Injectable()
export class CategoryActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(CATEGORY_IS_ACTIVE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!required) {
      return true
    }

    const { __category } = context.switchToHttp().getRequest<IRequestApp & { __category: CategoryDoc }>()

    if (!required.includes(__category.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_CATEGORY_STATUS_CODE_ERROR.CATEGORY_IS_ACTIVE_ERROR,
        message: 'category.error.isActiveInvalid',
      })
    }
    return true
  }
}
