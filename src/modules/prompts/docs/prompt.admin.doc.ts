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

import { PromptCreateDto } from '../dto/prompt.create.dto'
import { PromptUpdateDto } from '../dto/prompt.update.dto'
import { PromptDocParamsId } from '../constants/prompt.doc.constant'
import { PromptGetSerialization } from '../serializations/prompt.get.serialization'

export function PromptAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of prompts',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<PromptGetSerialization>('prompt.get', {
      serialization: PromptGetSerialization,
    })
  )
}

export function PromptAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a prompt',
    }),
    DocRequest({ params: PromptDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<PromptGetSerialization>('prompt.get', {
      serialization: PromptGetSerialization,
    })
  )
}

export function PromptAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a prompt',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: PromptCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('prompt.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function PromptAdminActiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make prompt be active',
    }),
    DocRequest({
      params: PromptDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('prompt.active')
  )
}

export function PromptAdminInactiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make prompt be inactive',
    }),
    DocRequest({
      params: PromptDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('prompt.inactive')
  )
}

export function PromptAdminUpdateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update data a prompt',
    }),
    DocRequest({
      body: PromptUpdateDto,
      params: PromptDocParamsId,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('prompt.update', {
      serialization: ResponseIdSerialization,
    })
  )
}

export function PromptAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a prompt',
    }),
    DocRequest({
      params: PromptDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('prompt.delete')
  )
}
