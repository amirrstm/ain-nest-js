import { Reflector } from '@nestjs/core'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'

import { TemplateDoc } from '../repository/entities/template.entity'
import { TEMPLATE_IS_ACTIVE_META_KEY } from '../constants/template.constant'
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from '../constants/template.status-code.constant'

@Injectable()
export class TemplateActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(TEMPLATE_IS_ACTIVE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!required) {
      return true
    }

    const { __template } = context.switchToHttp().getRequest<IRequestApp & { __template: TemplateDoc }>()

    if (!required.includes(__template.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_IS_ACTIVE_ERROR,
        message: 'template.error.isActiveInvalid',
      })
    }
    return true
  }
}
