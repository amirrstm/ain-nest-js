import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ProvinceNotFoundGuard } from '../guards/province.not-found.guard'
import { ProvinceDoc } from '../repository/entities/province.entity'

export function ProvincePublicGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ProvinceNotFoundGuard))
}

export const GetProvinceBySlug = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __province } = ctx.switchToHttp().getRequest<IRequestApp & { __province: ProvinceDoc }>()
  return (returnPlain ? __province.toObject() : __province) as T
})
