import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { TemplateDoc } from '../repository/entities/template.entity'

export const GetTemplate = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __template } = ctx.switchToHttp().getRequest<IRequestApp & { __template: TemplateDoc }>()
  return (returnPlain ? __template.toObject() : __template) as T
})
