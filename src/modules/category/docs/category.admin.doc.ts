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

import { CategoryDocParamsId } from '../constants/category.doc.constant'
import { CategoryCreateDto } from '../dto/category.create.dto'
import { CategoryUpdateDto } from '../dto/category.update.dto'
import { CategoryGetSerialization } from '../serializations/category.get.serialization'
import { CategoryInputSerialization } from '../serializations/category.inputs.serialization'

export function CategoryAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all of categories',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<CategoryGetSerialization>('category.get', {
      serialization: CategoryGetSerialization,
    })
  )
}

export function CategoryAdminInputListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get all the inputs of the category',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<CategoryInputSerialization>('category.get', {
      serialization: CategoryInputSerialization,
    })
  )
}

export function CategoryAdminGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a category',
    }),
    DocRequest({ params: CategoryDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('category.get', {
      serialization: CategoryGetSerialization,
    })
  )
}

export function CategoryAdminCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'create a category',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequest({
      body: CategoryCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('category.create', {
      httpStatus: HttpStatus.CREATED,
      serialization: ResponseIdSerialization,
    })
  )
}

export function CategoryAdminActiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make category be active',
    }),
    DocRequest({
      params: CategoryDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('category.active')
  )
}

export function CategoryAdminInactiveDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'make category be inactive',
    }),
    DocRequest({
      params: CategoryDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('category.inactive')
  )
}

export function CategoryAdminUpdateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update data a category',
    }),
    DocRequest({
      body: CategoryUpdateDto,
      params: CategoryDocParamsId,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse<ResponseIdSerialization>('category.update', {
      serialization: ResponseIdSerialization,
    })
  )
}

export function CategoryAdminDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'delete a category',
    }),
    DocRequest({
      params: CategoryDocParamsId,
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true, policy: true }),
    DocResponse('category.delete')
  )
}
