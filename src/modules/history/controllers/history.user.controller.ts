import { Body, Controller, Get, NotFoundException, Put } from '@nestjs/common'
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
import { HistoryUserDashboardDoc, HistoryUserFeedbackDoc } from '../docs/history.user.doc'
import { HistoryDoc, HistoryEntity } from '../repository/entities/history.entity'
import { HistoryListSerialization } from '../serializations/history.list.serialization'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { HistoryUserGetGuard } from '../decorators/history.user.decorator'
import { GetHistory } from '../decorators/history.admin.decorator'
import { ENUM_HISTORY_STATUS_CODE_ERROR } from '../constants/history.status-code.constant'
import { HistoryFeedbackDto } from '../dto/history.feedback.dto'

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

  @HistoryUserFeedbackDoc()
  @Response('history.feedback', { serialization: ResponseIdSerialization })
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @HistoryUserGetGuard()
  @Put('/feedback/:history')
  async feedback(
    @GetUser() user: UserDoc,
    @GetHistory() history: HistoryDoc,
    @Body() { feedback }: HistoryFeedbackDto
  ): Promise<IResponse> {
    if (history.user !== user._id) {
      throw new NotFoundException({
        statusCode: ENUM_HISTORY_STATUS_CODE_ERROR.HISTORY_NOT_BELONG_TO_USER,
        message: 'user.error.notFound',
      })
    }

    const updatedHistory = await this.historyService.updateFeedback(history, { feedback })

    return { data: updatedHistory._id }
  }
}
