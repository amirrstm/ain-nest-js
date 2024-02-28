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

import { PlanDocParamsId } from '../constants/plan.doc.constant'
import { PlanCreateDto } from '../dto/plan.create.dto'
import { PlanUpdateDto } from '../dto/plan.update.dto'
import { PlanGetSerialization } from '../serializations/plan.get.serialization'

export function PlanAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of plans',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<PlanGetSerialization>('plan.get', {
      serialization: PlanGetSerialization,
    })
  )
}

export function PlanAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a plan',
    }),
    DocRequest({ params: PlanDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('plan.get', {
      serialization: PlanGetSerialization,
    })
  )
}

export function PlanAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a plan',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: PlanCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('plan.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function PlanAdminActiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make plan be active',
    }),
    DocRequest({
      params: PlanDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('plan.active')
  )
}

export function PlanAdminInactiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make plan be inactive',
    }),
    DocRequest({
      params: PlanDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('plan.inactive')
  )
}

export function PlanAdminUpdateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update data a plan',
    }),
    DocRequest({
      body: PlanUpdateDto,
      params: PlanDocParamsId,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('plan.update', {
      serialization: ResponseIdSerialization,
    })
  )
}

export function PlanAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a plan',
    }),
    DocRequest({
      params: PlanDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('plan.delete')
  )
}
