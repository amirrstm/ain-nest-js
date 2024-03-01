import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
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
  INPUT_DEFAULT_IS_ACTIVE,
  INPUT_DEFAULT_ORDER_BY,
  INPUT_DEFAULT_PER_PAGE,
  INPUT_DEFAULT_ORDER_DIRECTION,
  INPUT_DEFAULT_AVAILABLE_SEARCH,
  INPUT_DEFAULT_AVAILABLE_ORDER_BY,
} from '../constants/input.list.constant'

import {
  InputAdminCreateDoc,
  InputAdminDeleteDoc,
  InputAdminGetDoc,
  InputAdminListDoc,
  InputAdminUpdateDoc,
} from '../docs/input.admin.doc'
import { InputCreateDto } from '../dto/input.create.dto'
import { InputService } from '../services/input.service'
import { InputRequestDto } from '../dto/input.request.dto'
import { InputUpdateDto } from '../dto/input.update.dto'
import {
  GetInput,
  InputAdminGetGuard,
  InputAdminUpdateGuard,
  InputAdminDeleteGuard,
} from '../decorators/input.admin.decorator'
import { InputDoc, InputEntity } from '../repository/entities/input.entity'
import { InputListSerialization } from '../serializations/input.list.serialization'
import { InputGetSerialization } from '../serializations/input.get.serialization'

@ApiTags('Modules.Admin.Input')
@Controller({ version: '1', path: '/input' })
export class InputAdminController {
  constructor(
    private readonly inputService: InputService,
    private readonly paginationService: PaginationService
  ) {}

  @InputAdminListDoc()
  @ResponsePaging('input.list', {
    serialization: InputListSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      INPUT_DEFAULT_PER_PAGE,
      INPUT_DEFAULT_ORDER_BY,
      INPUT_DEFAULT_ORDER_DIRECTION,
      INPUT_DEFAULT_AVAILABLE_SEARCH,
      INPUT_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', INPUT_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
    }

    const inputs: InputEntity[] = await this.inputService.findAll<InputEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
    })

    const total: number = await this.inputService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      data: inputs,
      _pagination: { total, totalPage },
    }
  }

  @InputAdminGetDoc()
  @Response('input.get', {
    serialization: InputGetSerialization,
  })
  @InputAdminGetGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(InputRequestDto)
  @Get('get/:input')
  async get(@GetInput(true) input: InputEntity): Promise<IResponse> {
    return { data: input }
  }

  @InputAdminCreateDoc()
  @Response('input.create', {
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
    { category, description, multiline, isRequired, name, placeholder, title, type }: InputCreateDto
  ): Promise<IResponse> {
    const create = await this.inputService.create({
      category,
      description,
      multiline,
      isRequired,
      name,
      placeholder,
      title,
      type,
    })

    return {
      data: { _id: create._id },
    }
  }

  @InputAdminUpdateDoc()
  @Response('input.update', {
    serialization: ResponseIdSerialization,
  })
  @InputAdminUpdateGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.USER,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(InputRequestDto)
  @Put('/update/:input')
  async update(
    @GetInput()
    input: InputDoc,
    @Body()
    body: InputUpdateDto
  ): Promise<IResponse> {
    await this.inputService.update(input, body)

    return {
      data: { _id: input._id },
    }
  }

  @InputAdminDeleteDoc()
  @Response('input.delete')
  @InputAdminDeleteGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(InputRequestDto)
  @Delete('/delete/:input')
  async delete(@GetInput() input: InputDoc): Promise<void> {
    await this.inputService.delete(input)

    return
  }
}
