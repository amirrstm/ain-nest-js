import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'

import { CategoryRequestService } from '../services/category-request.service'
import { CategoryRequestAdminListDoc } from '../docs/category-request.admin.doc'

import { CategoryRequestEntity } from '../repository/entities/category-request.entity'
import { CategoryRequestListSerialization } from '../serializations/category-request.list.serialization'
import {
  CATEGORY_REQUEST_DEFAULT_PER_PAGE,
  CATEGORY_REQUEST_DEFAULT_ORDER_BY,
  CATEGORY_REQUEST_DEFAULT_ORDER_DIRECTION,
  CATEGORY_REQUEST_DEFAULT_AVAILABLE_SEARCH,
  CATEGORY_REQUEST_DEFAULT_AVAILABLE_ORDER_BY,
} from '../constants/category-request.list.constant'
import { PaginationService } from 'src/common/pagination/services/pagination.service'

@ApiTags('Modules.Admin.CategoryRequest')
@Controller({ version: '1', path: '/category-request' })
export class CategoryRequestAdminController {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly requestService: CategoryRequestService
  ) {}

  @CategoryRequestAdminListDoc()
  @ResponsePaging('category-request.list', { serialization: CategoryRequestListSerialization })
  @PolicyAbilityProtected({ subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      CATEGORY_REQUEST_DEFAULT_PER_PAGE,
      CATEGORY_REQUEST_DEFAULT_ORDER_BY,
      CATEGORY_REQUEST_DEFAULT_ORDER_DIRECTION,
      CATEGORY_REQUEST_DEFAULT_AVAILABLE_SEARCH,
      CATEGORY_REQUEST_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search }

    const requests: CategoryRequestEntity[] = await this.requestService.findAll<CategoryRequestEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
      join: [
        {
          path: 'user',
          select: ['_id', 'mobileNumber', 'email'],
        },
      ],
    })

    const total: number = await this.requestService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return { _pagination: { total, totalPage }, data: requests }
  }
}
