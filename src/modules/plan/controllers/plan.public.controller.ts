import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'
import { IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { PaginationQuery, PaginationQueryFilterInBoolean } from 'src/common/pagination/decorators/pagination.decorator'

import { PlanService } from '../services/plan.service'
import { PlanPublicListDoc } from '../docs/plan.public.doc'
import { PlanListSerialization } from '../serializations/plan.list.serialization'
import {
  PLAN_DEFAULT_AVAILABLE_ORDER_BY,
  PLAN_DEFAULT_AVAILABLE_SEARCH,
  PLAN_DEFAULT_IS_ACTIVE,
  PLAN_DEFAULT_ORDER_BY,
  PLAN_DEFAULT_ORDER_DIRECTION,
  PLAN_DEFAULT_PER_PAGE,
} from '../constants/plan.list.constant'
import { PlanEntity } from '../repository/entities/plan.entity'

@ApiTags('Modules.Public.Plan')
@Controller({ version: '1', path: '/plan' })
export class PlanPublicController {
  constructor(
    private readonly planService: PlanService,
    private readonly paginationService: PaginationService
  ) {}

  @PlanPublicListDoc()
  @ResponsePaging('plan.list', {
    serialization: PlanListSerialization,
  })
  @Get('/list')
  async list(
    @PaginationQuery(
      PLAN_DEFAULT_PER_PAGE,
      PLAN_DEFAULT_ORDER_BY,
      PLAN_DEFAULT_ORDER_DIRECTION,
      PLAN_DEFAULT_AVAILABLE_SEARCH,
      PLAN_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', PLAN_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>,
    @RequestCustomLang()
    customLang: string
  ): Promise<IResponsePaging> {
    const search: Record<string, any> = {
      ..._search,
      ...isActive,
    }

    const defaultLanguage: string = 'en'
    const nonTranslatedFields: Record<string, number> = {
      _id: 1,
      slug: 1,
      isActive: 1,
      generation: 1,
      features: 1,
      price: 1,
      isDefault: 1,
      offForAnnual: 1,
    }
    const rawCategories: PlanEntity[] = await this.planService.rawFindAll<PlanEntity>(
      [
        {
          $match: { isActive: true },
        },
        {
          $project: {
            ...nonTranslatedFields,
            name: { $ifNull: [`$name.${customLang}`, `$name.${defaultLanguage}`] },
            description: { $ifNull: [`$description.${customLang}`, `$description.${defaultLanguage}`] },
          },
        },
      ],
      {
        search,
        paging: {
          limit: _limit,
          offset: _offset,
        },
        order: _order,
      }
    )

    const total: number = await this.planService.getTotal(search)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      data: rawCategories,
      _pagination: { total, totalPage },
    }
  }
}
