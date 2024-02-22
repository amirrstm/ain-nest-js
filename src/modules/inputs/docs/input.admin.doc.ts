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

import { InputCreateDto } from '../dto/input.create.dto'
import { InputUpdateDto } from '../dto/input.update.dto'
import { InputDocParamsId } from '../constants/input.doc.constant'
import { InputGetSerialization } from '../serializations/input.get.serialization'

export function InputAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of inputs',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<InputGetSerialization>('input.get', {
      serialization: InputGetSerialization,
    })
  )
}

export function InputAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a input',
    }),
    DocRequest({ params: InputDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<InputGetSerialization>('input.get', {
      serialization: InputGetSerialization,
    })
  )
}

export function InputAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a input',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: InputCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('input.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function InputAdminActiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make input be active',
    }),
    DocRequest({
      params: InputDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('input.active')
  )
}

export function InputAdminInactiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make input be inactive',
    }),
    DocRequest({
      params: InputDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('input.inactive')
  )
}

export function InputAdminUpdateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update data a input',
    }),
    DocRequest({
      body: InputUpdateDto,
      params: InputDocParamsId,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('input.update', {
      serialization: ResponseIdSerialization,
    })
  )
}

export function InputAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a input',
    }),
    DocRequest({
      params: InputDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('input.delete')
  )
}
