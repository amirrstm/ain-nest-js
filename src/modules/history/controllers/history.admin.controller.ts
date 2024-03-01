import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import { HistoryRequestDto } from '../dto/history.request.dto'
import { HistoryCreateDto } from '../dto/history.create.dto'
import { HistoryService } from '../services/history.service'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { HistoryAdminListDoc, HistoryAdminGetDoc, HistoryAdminCreateDoc } from '../docs/history.admin.doc'

import { HistoryDoc, HistoryEntity } from '../repository/entities/history.entity'
import { HistoryListSerialization } from '../serializations/history.list.serialization'
import { HistoryAdminGetGuard, GetHistory } from '../decorators/history.admin.decorator'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'
import {
  HISTORY_DEFAULT_AVAILABLE_ORDER_BY,
  HISTORY_DEFAULT_AVAILABLE_SEARCH,
  HISTORY_DEFAULT_ORDER_BY,
  HISTORY_DEFAULT_ORDER_DIRECTION,
  HISTORY_DEFAULT_PER_PAGE,
} from '../constants/history.list.constant'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { HistoryGetSerialization } from '../serializations/history.get.serialization'

@ApiTags('Modules.Admin.History')
@Controller({ version: '1', path: '/history' })
export class HistoryAdminController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly paginationService: PaginationService
  ) {}

  @HistoryAdminListDoc()
  @ResponsePaging('history.list', { serialization: HistoryListSerialization })
  @PolicyAbilityProtected({ subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      HISTORY_DEFAULT_PER_PAGE,
      HISTORY_DEFAULT_ORDER_BY,
      HISTORY_DEFAULT_ORDER_DIRECTION,
      HISTORY_DEFAULT_AVAILABLE_SEARCH,
      HISTORY_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search }

    const histories: HistoryEntity[] = await this.historyService.findAll<HistoryEntity>(find, {
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

    const total: number = await this.historyService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      _pagination: { total, totalPage },
      data: histories,
    }
  }

  @HistoryAdminGetDoc()
  @Response('history.get', { serialization: HistoryGetSerialization })
  @HistoryAdminGetGuard()
  @PolicyAbilityProtected({ subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(HistoryRequestDto)
  @Get('get/:history')
  async get(@GetHistory() history: HistoryDoc): Promise<IResponse> {
    const joinProperty = await this.historyService.joinWithProperty(history)

    return { data: joinProperty.toJSON() }
  }

  @HistoryAdminCreateDoc()
  @Response('history.create', { serialization: ResponseIdSerialization })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
  })
  @AuthJwtAdminAccessProtected()
  @Post('/create')
  async create(@Body() { category, inputValues, user }: HistoryCreateDto): Promise<IResponse> {
    const create = await this.historyService.create({ category, inputValues, user })

    return {
      data: { _id: create._id },
    }
  }
}
