import { Body, ConflictException, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PaginationQuery, PaginationQueryFilterInBoolean } from 'src/common/pagination/decorators/pagination.decorator'
import {
  PROMPT_DEFAULT_IS_ACTIVE,
  PROMPT_DEFAULT_ORDER_BY,
  PROMPT_DEFAULT_PER_PAGE,
  PROMPT_DEFAULT_ORDER_DIRECTION,
  PROMPT_DEFAULT_AVAILABLE_SEARCH,
  PROMPT_DEFAULT_AVAILABLE_ORDER_BY,
} from '../constants/prompt.list.constant'

import {
  PromptAdminCreateDoc,
  PromptAdminDeleteDoc,
  PromptAdminGetDoc,
  PromptAdminListDoc,
  PromptAdminUpdateDoc,
} from '../docs/prompt.admin.doc'
import { PromptCreateDto } from '../dto/prompt.create.dto'
import { PromptService } from '../services/prompt.service'
import { ENUM_PROMPT_STATUS_CODE_ERROR } from '../constants/prompt.status-code.constant'
import { PromptRequestDto } from '../dto/prompt.request.dto'
import { PromptUpdateDto } from '../dto/prompt.update.dto'
import {
  PromptAdminUpdateGuard,
  GetPrompt,
  PromptAdminGetGuard,
  PromptAdminDeleteGuard,
} from '../decorators/prompt.admin.decorator'
import { PromptDoc, PromptEntity } from '../repository/entities/prompt.entity'
import { PromptListSerialization } from '../serializations/prompt.list.serialization'
import { PromptGetSerialization } from '../serializations/prompt.get.serialization'

@ApiTags('Modules.Admin.Prompt')
@Controller({ version: '1', path: '/prompt' })
export class PromptAdminController {
  constructor(
    private readonly promptService: PromptService,
    private readonly paginationService: PaginationService
  ) {}

  @PromptAdminListDoc()
  @ResponsePaging('prompt.list', {
    serialization: PromptListSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      PROMPT_DEFAULT_PER_PAGE,
      PROMPT_DEFAULT_ORDER_BY,
      PROMPT_DEFAULT_ORDER_DIRECTION,
      PROMPT_DEFAULT_AVAILABLE_SEARCH,
      PROMPT_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', PROMPT_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
    }

    const categories: PromptEntity[] = await this.promptService.findAll<PromptEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
    })

    const total: number = await this.promptService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      _pagination: { total, totalPage },
      data: categories,
    }
  }

  @PromptAdminGetDoc()
  @Response('prompt.get', {
    serialization: PromptGetSerialization,
  })
  @PromptAdminGetGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(PromptRequestDto)
  @Get('get/:prompt')
  async get(@GetPrompt(true) prompt: PromptEntity): Promise<IResponse> {
    return { data: prompt }
  }

  @PromptAdminCreateDoc()
  @Response('prompt.create', {
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
    { category, description }: PromptCreateDto
  ): Promise<IResponse> {
    const exist: PromptDoc = await this.promptService.findOne({ category })

    if (exist) {
      throw new ConflictException({
        statusCode: ENUM_PROMPT_STATUS_CODE_ERROR.PROMPT_EXIST_ERROR,
        message: 'prompt.error.exist',
      })
    }

    const create = await this.promptService.create({ category, description })

    return {
      data: { _id: create._id },
    }
  }

  @PromptAdminUpdateDoc()
  @Response('prompt.update', {
    serialization: ResponseIdSerialization,
  })
  @PromptAdminUpdateGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.USER,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(PromptRequestDto)
  @Put('/update/:prompt')
  async update(
    @GetPrompt()
    prompt: PromptDoc,
    @Body()
    body: PromptUpdateDto
  ): Promise<IResponse> {
    await this.promptService.update(prompt, body)

    return {
      data: { _id: prompt._id },
    }
  }

  @PromptAdminDeleteDoc()
  @Response('prompt.delete')
  @PromptAdminDeleteGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(PromptRequestDto)
  @Delete('/delete/:prompt')
  async delete(@GetPrompt() prompt: PromptDoc): Promise<void> {
    await this.promptService.delete(prompt)

    return
  }
}
