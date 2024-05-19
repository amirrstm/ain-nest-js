import { applyDecorators } from '@nestjs/common'

import { Doc, DocAuth, DocRequest, DocResponse, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { TemplateGetSerialization } from '../serializations/template.get.serialization'
import { TemplateListSerialization } from '../serializations/template.list.serialization'
import { TemplateDocParamsId, TemplateDocQueryIsActive, TemplateDocQueryType } from '../constants/template.doc.constant'

export function TemplatePublicListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of templates',
    }),
    DocRequest({
      queries: [...TemplateDocQueryIsActive, ...TemplateDocQueryType],
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocResponsePaging<TemplateListSerialization>('template.list', {
      serialization: TemplateListSerialization,
    })
  )
}

export function TemplatePublicGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a template',
    }),
    DocRequest({
      params: TemplateDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocResponse<TemplateGetSerialization>('template.get', {
      serialization: TemplateGetSerialization,
    })
  )
}
