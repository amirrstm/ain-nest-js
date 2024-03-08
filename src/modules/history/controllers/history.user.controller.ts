import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'

import {
  HISTORY_DEFAULT_AVAILABLE_ORDER_BY,
  HISTORY_DEFAULT_AVAILABLE_SEARCH,
  HISTORY_DEFAULT_ORDER_BY,
  HISTORY_DEFAULT_ORDER_DIRECTION,
  HISTORY_DEFAULT_PER_PAGE,
} from '../constants/history.list.constant'

import { HistoryService } from '../services/history.service'
import { HistoryUserDashboardDoc } from '../docs/history.user.doc'
import { HistoryEntity } from '../repository/entities/history.entity'
import { HistoryListSerialization } from '../serializations/history.list.serialization'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'

@ApiTags('Modules.User.History')
@Controller({ version: '1', path: '/history' })
export class HistoryUserController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly paginationService: PaginationService
  ) {}

  @HistoryUserDashboardDoc()
  @Response('history.list', {
    serialization: HistoryListSerialization,
  })
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Get('/dashboard')
  async dashboard(@GetUser() user: UserDoc): Promise<IResponse> {
    const histories: HistoryEntity[] = await this.historyService.rawFindAll<HistoryEntity>([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $group: {
          totalRecords: { $sum: 1 },
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          totalRecords: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ])

    return {
      data: histories,
    }
  }

  @HistoryUserDashboardDoc()
  @ResponsePaging('history.list', {
    serialization: HistoryListSerialization,
  })
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      HISTORY_DEFAULT_PER_PAGE,
      HISTORY_DEFAULT_ORDER_BY,
      HISTORY_DEFAULT_ORDER_DIRECTION,
      HISTORY_DEFAULT_AVAILABLE_SEARCH,
      HISTORY_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset }: PaginationListDto,
    @GetUser() user: UserDoc,
    @RequestCustomLang() language: string
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search, user: user._id }

    const histories = await this.historyService.rawFindAllAndJoin(language, find, { _limit, _offset })

    const total: number = await this.historyService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      _pagination: { total, totalPage },
      data: histories,
    }
  }
}
