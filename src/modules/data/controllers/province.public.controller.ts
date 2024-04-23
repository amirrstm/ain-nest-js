import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'
import { IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'

import { ProvinceService } from '../services/province.service'
import { IProvinceEntity } from '../interfaces/province.interface'
import { ProvincePublicListDoc } from '../docs/province.public.doc'
import { ProvinceListSerialization } from '../serializations/province.list.serialization'
import {
  PROVINCE_DEFAULT_AVAILABLE_ORDER_BY,
  PROVINCE_DEFAULT_AVAILABLE_SEARCH,
  PROVINCE_DEFAULT_ORDER_BY,
  PROVINCE_DEFAULT_ORDER_DIRECTION,
  PROVINCE_DEFAULT_PER_PAGE,
} from '../constants/province.list.constant'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class ProvincePublicController {
  constructor(
    private readonly provinceService: ProvinceService,
    private readonly paginationService: PaginationService
  ) {}

  @ProvincePublicListDoc()
  @ResponsePaging('data.province.list', { serialization: ProvinceListSerialization })
  @Get('/provinces')
  async list(
    @PaginationQuery(
      PROVINCE_DEFAULT_PER_PAGE,
      PROVINCE_DEFAULT_ORDER_BY,
      PROVINCE_DEFAULT_ORDER_DIRECTION,
      PROVINCE_DEFAULT_AVAILABLE_SEARCH,
      PROVINCE_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,

    @RequestCustomLang()
    customLang: string
  ): Promise<IResponsePaging> {
    const search: Record<string, any> = { ..._search }

    const defaultLanguage: string = 'en'
    const nonTranslatedFields: Record<string, number> = {
      _id: 1,
      slug: 1,
      latitude: 1,
      longitude: 1,
    }
    const rawProvinces: IProvinceEntity[] = await this.provinceService.rawFindAll<IProvinceEntity>(
      [
        {
          $project: {
            ...nonTranslatedFields,
            name: { $ifNull: [`$name.${customLang}`, `$name.${defaultLanguage}`] },
            cities: {
              $map: {
                input: '$cities',
                as: 'city',
                in: {
                  $mergeObjects: [
                    '$$city',
                    {
                      name: {
                        $ifNull: [`$$city.name.${customLang}`, `$$city.name.${defaultLanguage}`],
                      },
                    },
                  ],
                },
              },
            },
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

    const total: number = await this.provinceService.getTotal(search)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      data: rawProvinces,
      _pagination: { total, totalPage },
    }
  }
}
