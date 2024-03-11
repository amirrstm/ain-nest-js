import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'

import { ChatRequestDto } from '../dto/chat.request.dto'
import { ChatService } from '../services/chat.service'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { ChatAdminListDoc, ChatAdminGetDoc } from '../docs/chat.admin.doc'

import { ChatDoc, ChatEntity } from '../repository/entities/chat.entity'
import { ChatListSerialization } from '../serializations/chat.list.serialization'
import { ChatAdminGetGuard, GetChat } from '../decorators/chat.admin.decorator'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'
import {
  CHAT_DEFAULT_PER_PAGE,
  CHAT_DEFAULT_ORDER_BY,
  CHAT_DEFAULT_ORDER_DIRECTION,
  CHAT_DEFAULT_AVAILABLE_SEARCH,
  CHAT_DEFAULT_AVAILABLE_ORDER_BY,
} from '../constants/chat.list.constant'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { ChatGetSerialization } from '../serializations/chat.get.serialization'

@ApiTags('Modules.Admin.Chat')
@Controller({ version: '1', path: '/chat' })
export class ChatAdminController {
  constructor(
    private readonly chatService: ChatService,
    private readonly paginationService: PaginationService
  ) {}

  @ChatAdminListDoc()
  @ResponsePaging('chat.list', { serialization: ChatListSerialization })
  @PolicyAbilityProtected({ subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      CHAT_DEFAULT_PER_PAGE,
      CHAT_DEFAULT_ORDER_BY,
      CHAT_DEFAULT_ORDER_DIRECTION,
      CHAT_DEFAULT_AVAILABLE_SEARCH,
      CHAT_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search }

    const chats: ChatEntity[] = await this.chatService.findAll<ChatEntity>(find, {
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

    const total: number = await this.chatService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return { _pagination: { total, totalPage }, data: chats }
  }

  @ChatAdminGetDoc()
  @Response('chat.get', { serialization: ChatGetSerialization })
  @ChatAdminGetGuard()
  @PolicyAbilityProtected({ subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(ChatRequestDto)
  @Get('get/:chat')
  async get(@GetChat() chat: ChatDoc): Promise<IResponse> {
    const joinProperty = await this.chatService.joinWithProperty(chat)

    return { data: joinProperty.toJSON() }
  }
}
