import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant'
import {
  Doc,
  DocAuth,
  DocRequest,
  DocGuard,
  DocResponse,
  DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import { TemplateCreateDto } from '../dtos/template.create.dto'
import { TemplateUpdateDto } from '../dtos/template.update.dto'
import { TemplateGetSerialization } from '../serializations/template.get.serialization'
import { TemplateListSerialization } from '../serializations/template.list.serialization'
import { TemplateDocParamsId, TemplateDocQueryIsActive, TemplateDocQueryType } from '../constants/template.doc.constant'

export function TemplateAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'get all of templates' }),
    DocRequest({ queries: [...TemplateDocQueryIsActive, ...TemplateDocQueryType] }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<TemplateListSerialization>('template.list', {
      serialization: TemplateListSerialization,
    })
  )
}

export function TemplateAdminGetDoc(): MethodDecorator {
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
    DocGuard({ role: true, policy: true }),
    DocResponse<TemplateGetSerialization>('template.get', {
      serialization: TemplateGetSerialization,
    })
  )
}

export function TemplateAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a template',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      body: TemplateCreateDto,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('template.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function TemplateAdminActiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make template be active',
    }),
    DocRequest({
      params: TemplateDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('template.active')
  )
}

export function TemplateAdminInactiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make template be inactive',
    }),
    DocRequest({
      params: TemplateDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('template.inactive')
  )
}

export function TemplateAdminUpdateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update data a template',
    }),
    DocRequest({
      params: TemplateDocParamsId,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      body: TemplateUpdateDto,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('template.update', {
      serialization: ResponseIdSerialization,
    })
  )
}

export function TemplateAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a template',
    }),
    DocRequest({
      params: TemplateDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('template.delete')
  )
}
