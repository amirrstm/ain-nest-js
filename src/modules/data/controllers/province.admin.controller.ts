import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'

import {
  ProvinceAdminCreateDoc,
  ProvinceAdminDeleteDoc,
  ProvinceAdminGetDoc,
  ProvinceAdminListDoc,
} from '../docs/province.admin.doc'
import { ProvinceCreateDto } from '../dto/province.create.dto'
import { ProvinceService } from '../services/province.service'
import { ProvinceRequestDto } from '../dto/province.request.dto'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'

import { ProvinceDoc, ProvinceEntity } from '../repository/entities/province.entity'
import { ProvinceListSerialization } from '../serializations/province.list.serialization'
import { ProvinceAdminDeleteGuard, ProvinceAdminGetGuard, GetProvince } from '../decorators/province.admin.decorator'
import {
  PROVINCE_DEFAULT_AVAILABLE_ORDER_BY,
  PROVINCE_DEFAULT_AVAILABLE_SEARCH,
  PROVINCE_DEFAULT_ORDER_BY,
  PROVINCE_DEFAULT_ORDER_DIRECTION,
  PROVINCE_DEFAULT_PER_PAGE,
} from '../constants/province.list.constant'

import { ProvinceGetSerialization } from '../serializations/province.get.serialization'

@ApiTags('Modules.Admin.Data')
@Controller({ version: '1', path: '/data' })
export class ProvinceAdminController {
  constructor(
    private readonly provinceService: ProvinceService,
    private readonly paginationService: PaginationService
  ) {}

  @ProvinceAdminListDoc()
  @ResponsePaging('data.province.list', {
    serialization: ProvinceListSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @Get('/provinces')
  async provinces(
    @PaginationQuery(
      PROVINCE_DEFAULT_PER_PAGE,
      PROVINCE_DEFAULT_ORDER_BY,
      PROVINCE_DEFAULT_ORDER_DIRECTION,
      PROVINCE_DEFAULT_AVAILABLE_SEARCH,
      PROVINCE_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search }

    const provinces: ProvinceEntity[] = await this.provinceService.findAll<ProvinceEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
    })

    const total: number = await this.provinceService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      data: provinces,
      _pagination: { total, totalPage },
    }
  }

  @ProvinceAdminGetDoc()
  @Response('data.province.get', {
    serialization: ProvinceGetSerialization,
  })
  @ProvinceAdminGetGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(ProvinceRequestDto)
  @Get('get/:province')
  async get(@GetProvince(true) province: ProvinceEntity): Promise<IResponse> {
    return { data: province }
  }

  @ProvinceAdminCreateDoc()
  @Response('data.province.create', {
    serialization: ResponseIdSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
  })
  @AuthJwtAdminAccessProtected()
  @Post('/create')
  async create(
    @Body()
    { name, cities, latitude, longitude }: ProvinceCreateDto
  ): Promise<IResponse> {
    const create = await this.provinceService.create({ name, cities, latitude, longitude })

    return {
      data: { _id: create._id },
    }
  }

  @ProvinceAdminDeleteDoc()
  @Response('data.province.delete')
  @ProvinceAdminDeleteGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(ProvinceRequestDto)
  @Delete('/delete/:province')
  async delete(@GetProvince() province: ProvinceDoc): Promise<void> {
    await this.provinceService.delete(province)

    return
  }
}
