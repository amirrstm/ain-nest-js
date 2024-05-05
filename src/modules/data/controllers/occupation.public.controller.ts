import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'

import {
  OCCUPATION_DEFAULT_ORDER_BY,
  OCCUPATION_DEFAULT_PER_PAGE,
  OCCUPATION_DEFAULT_ORDER_DIRECTION,
  OCCUPATION_DEFAULT_AVAILABLE_SEARCH,
  OCCUPATION_DEFAULT_AVAILABLE_ORDER_BY,
} from '../constants/occupation.list.constant'
import { OccupationService } from '../services/occupation.service'
import { OccupationPublicListDoc } from '../docs/occupation.public.doc'
import { OccupationGetSerialization } from '../serializations/occupation.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class OccupationPublicController {
  constructor(
    private readonly occupationService: OccupationService,
    private readonly paginationService: PaginationService
  ) {}

  @OccupationPublicListDoc()
  @ResponsePaging('data.occupation.list', { serialization: OccupationGetSerialization })
  @Get('/occupations')
  async list(
    @PaginationQuery(
      OCCUPATION_DEFAULT_PER_PAGE,
      OCCUPATION_DEFAULT_ORDER_BY,
      OCCUPATION_DEFAULT_ORDER_DIRECTION,
      OCCUPATION_DEFAULT_AVAILABLE_SEARCH,
      OCCUPATION_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit }: PaginationListDto,
    @Query()
    query: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search }
    const data = await this.occupationService.getFromApi(query.search)

    const total: number = await this.occupationService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      _pagination: { total, totalPage },
      data: data,
    }
  }
}
