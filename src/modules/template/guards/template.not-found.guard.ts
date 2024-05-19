import { IRequestApp } from 'src/common/request/interfaces/request.interface'
import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'

import { TemplateDoc } from '../repository/entities/template.entity'
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from '../constants/template.status-code.constant'

@Injectable()
export class TemplateNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __template } = context.switchToHttp().getRequest<IRequestApp & { __template: TemplateDoc }>()

    if (!__template) {
      throw new NotFoundException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_NOT_FOUND_ERROR,
        message: 'template.error.notFound',
      })
    }

    return true
  }
}
