import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { TemplateService } from '../services/template.service'
import { TemplateDoc } from '../repository/entities/template.entity'

@Injectable()
export class TemplatePutToRequestGuard implements CanActivate {
  constructor(private readonly templateService: TemplateService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __template: TemplateDoc }>()
    const { params } = request
    const { template } = params

    const check: TemplateDoc = await this.templateService.findOneById(template, { join: true })
    request.__template = check

    return true
  }
}
