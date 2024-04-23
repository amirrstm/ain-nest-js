import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ProvinceDoc } from '../repository/entities/province.entity'
import { ProvinceNotFoundGuard } from '../guards/province.not-found.guard'
import { ProvincePutToRequestGuard } from '../guards/province.put-to-request.guard'

export function ProvinceAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ProvincePutToRequestGuard, ProvinceNotFoundGuard))
}

export function ProvinceAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ProvincePutToRequestGuard, ProvinceNotFoundGuard))
}

export function ProvinceAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ProvincePutToRequestGuard, ProvinceNotFoundGuard))
}

export const GetProvince = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __province } = ctx.switchToHttp().getRequest<IRequestApp & { __province: ProvinceDoc }>()
  return (returnPlain ? __province.toObject() : __province) as T
})
