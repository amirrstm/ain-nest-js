import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ProvinceDoc } from '../repository/entities/province.entity'
import { ENUM_PROVINCE_STATUS_CODE_ERROR } from '../constants/province.status-code.constant'

@Injectable()
export class ProvinceNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __province } = context.switchToHttp().getRequest<IRequestApp & { __province: ProvinceDoc }>()

    if (!__province) {
      throw new NotFoundException({
        statusCode: ENUM_PROVINCE_STATUS_CODE_ERROR.PROVINCE_NOT_FOUND_ERROR,
        message: 'data.province.error.notFound',
      })
    }

    return true
  }
}
