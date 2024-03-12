import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { CategoryRequestService } from '../services/category-request.service'
import { CategoryRequestDoc } from '../repository/entities/category-request.entity'

@Injectable()
export class CategoryRequestPutToRequestGuard implements CanActivate {
  constructor(private readonly requestService: CategoryRequestService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __request_category: CategoryRequestDoc }>()
    const { params } = request
    const { request_category } = params

    const check: CategoryRequestDoc = await this.requestService.findOneById(request_category)
    request.__request_category = check

    return true
  }
}
