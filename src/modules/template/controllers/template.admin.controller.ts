import { ApiTags } from '@nestjs/swagger'
import { Body, ConflictException, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common'

import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import {
  PaginationQuery,
  PaginationQueryFilterInBoolean,
  PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'

import { ENUM_TEMPLATE_TYPE } from '../constants/template.enum.constant'

import {
  TEMPLATE_DEFAULT_AVAILABLE_ORDER_BY,
  TEMPLATE_DEFAULT_AVAILABLE_SEARCH,
  TEMPLATE_DEFAULT_IS_ACTIVE,
  TEMPLATE_DEFAULT_ORDER_BY,
  TEMPLATE_DEFAULT_ORDER_DIRECTION,
  TEMPLATE_DEFAULT_PER_PAGE,
  TEMPLATE_DEFAULT_TYPE,
} from '../constants/template.list.constant'
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from '../constants/template.status-code.constant'
import {
  TemplateAdminDeleteGuard,
  TemplateAdminGetGuard,
  TemplateAdminUpdateActiveGuard,
  TemplateAdminUpdateGuard,
  TemplateAdminUpdateInactiveGuard,
} from '../decorators/template.admin.decorator'
import { GetTemplate } from '../decorators/template.decorator'
import {
  TemplateAdminActiveDoc,
  TemplateAdminCreateDoc,
  TemplateAdminDeleteDoc,
  TemplateAdminGetDoc,
  TemplateAdminInactiveDoc,
  TemplateAdminListDoc,
  TemplateAdminUpdateDoc,
} from '../docs/template.admin.doc'
import { TemplateCreateDto } from '../dtos/template.create.dto'
import { TemplateRequestDto } from '../dtos/template.request.dto'
import { TemplateUpdateDto } from '../dtos/template.update.dto'
import { TemplateService } from '../services/template.service'
import { TemplateDoc, TemplateEntity } from '../repository/entities/template.entity'
import { TemplateGetSerialization } from '../serializations/template.get.serialization'
import { TemplateListSerialization } from '../serializations/template.list.serialization'

import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { UserService } from 'src/modules/user/services/user.service'

@ApiTags('Modules.Admin.Template')
@Controller({ version: '1', path: '/template' })
export class TemplateAdminController {
  constructor(
    private readonly userService: UserService,
    private readonly templateService: TemplateService,
    private readonly paginationService: PaginationService
  ) {}

  @TemplateAdminListDoc()
  @ResponsePaging('template.list', {
    serialization: TemplateListSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      TEMPLATE_DEFAULT_PER_PAGE,
      TEMPLATE_DEFAULT_ORDER_BY,
      TEMPLATE_DEFAULT_ORDER_DIRECTION,
      TEMPLATE_DEFAULT_AVAILABLE_SEARCH,
      TEMPLATE_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', TEMPLATE_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>,
    @PaginationQueryFilterInEnum('type', TEMPLATE_DEFAULT_TYPE, ENUM_TEMPLATE_TYPE)
    type: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
      ...type,
    }

    const templates: TemplateEntity[] = await this.templateService.findAll<TemplateEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
    })

    const total: number = await this.templateService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      data: templates,
      _pagination: { total, totalPage },
    }
  }

  @TemplateAdminGetDoc()
  @Response('template.get', {
    serialization: TemplateGetSerialization,
  })
  @TemplateAdminGetGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(TemplateRequestDto)
  @Get('get/:template')
  async get(@GetTemplate(true) template: TemplateEntity): Promise<IResponse> {
    return { data: template }
  }

  @TemplateAdminCreateDoc()
  @Response('template.create', {
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
    { name, description, lang, type, image, path, defaultSettings }: TemplateCreateDto
  ): Promise<IResponse> {
    const exist: boolean = await this.templateService.existByName(name)

    if (exist) {
      throw new ConflictException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_EXIST_ERROR,
        message: 'template.error.exist',
      })
    }

    const create = await this.templateService.create({ name, lang, description, type, image, path, defaultSettings })

    return {
      data: { _id: create._id },
    }
  }

  @TemplateAdminUpdateDoc()
  @Response('template.update', {
    serialization: ResponseIdSerialization,
  })
  @TemplateAdminUpdateGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(TemplateRequestDto)
  @Put('/update/:template')
  async update(
    @GetTemplate() template: TemplateDoc,
    @Body() { description, image, path, defaultSettings }: TemplateUpdateDto
  ): Promise<IResponse> {
    await this.templateService.update(template, { description, image, path, defaultSettings })

    return {
      data: { _id: template._id },
    }
  }

  @TemplateAdminDeleteDoc()
  @Response('template.delete')
  @TemplateAdminDeleteGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.DELETE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(TemplateRequestDto)
  @Delete('/delete/:template')
  async delete(@GetTemplate() template: TemplateDoc): Promise<void> {
    const used: UserDoc = await this.userService.findOne({
      template: template._id,
    })

    if (used) {
      throw new ConflictException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_USED_ERROR,
        message: 'template.error.used',
      })
    }

    await this.templateService.delete(template)

    return
  }

  @TemplateAdminInactiveDoc()
  @Response('template.inactive')
  @TemplateAdminUpdateInactiveGuard()
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(TemplateRequestDto)
  @Patch('/update/:template/inactive')
  async inactive(@GetTemplate() template: TemplateDoc): Promise<void> {
    await this.templateService.inactive(template)

    return
  }

  @TemplateAdminActiveDoc()
  @Response('template.active')
  @TemplateAdminUpdateActiveGuard()
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(TemplateRequestDto)
  @Patch('/update/:template/active')
  async active(@GetTemplate() template: TemplateDoc): Promise<void> {
    await this.templateService.active(template)

    return
  }
}
