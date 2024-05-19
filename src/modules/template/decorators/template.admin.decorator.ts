import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { TemplateActiveGuard } from '../guards/template.active.guard'
import { TemplateNotFoundGuard } from '../guards/template.not-found.guard'
import { TEMPLATE_IS_ACTIVE_META_KEY } from '../constants/template.constant'
import { TemplatePutToRequestGuard } from '../guards/template.put-to-request.guard'

export function TemplateAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(TemplatePutToRequestGuard, TemplateNotFoundGuard))
}

export function TemplateAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(TemplatePutToRequestGuard, TemplateNotFoundGuard, TemplateActiveGuard),
    SetMetadata(TEMPLATE_IS_ACTIVE_META_KEY, [true])
  )
}

export function TemplateAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(TemplatePutToRequestGuard, TemplateNotFoundGuard, TemplateActiveGuard),
    SetMetadata(TEMPLATE_IS_ACTIVE_META_KEY, [true])
  )
}

export function TemplateAdminUpdateActiveGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(TemplatePutToRequestGuard, TemplateNotFoundGuard, TemplateActiveGuard),
    SetMetadata(TEMPLATE_IS_ACTIVE_META_KEY, [false])
  )
}

export function TemplateAdminUpdateInactiveGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(TemplatePutToRequestGuard, TemplateNotFoundGuard, TemplateActiveGuard),
    SetMetadata(TEMPLATE_IS_ACTIVE_META_KEY, [true])
  )
}
