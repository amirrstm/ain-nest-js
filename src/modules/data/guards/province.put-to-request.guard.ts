import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ProvinceService } from '../services/province.service'
import { ProvinceDoc } from '../repository/entities/province.entity'

@Injectable()
export class ProvincePutToRequestGuard implements CanActivate {
  constructor(private readonly provinceService: ProvinceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __province: ProvinceDoc }>()
    const { params } = request
    const { province } = params

    const check: ProvinceDoc = await this.provinceService.findOneById(province)
    request.__province = check

    return true
  }
}
