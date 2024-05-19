import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'

import {
  PaginationQuery,
  PaginationQueryFilterInBoolean,
  PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationService } from 'src/common/pagination/services/pagination.service'

import {
  TEMPLATE_DEFAULT_AVAILABLE_ORDER_BY,
  TEMPLATE_DEFAULT_AVAILABLE_SEARCH,
  TEMPLATE_DEFAULT_IS_ACTIVE,
  TEMPLATE_DEFAULT_ORDER_BY,
  TEMPLATE_DEFAULT_ORDER_DIRECTION,
  TEMPLATE_DEFAULT_PER_PAGE,
  TEMPLATE_DEFAULT_TYPE,
} from '../constants/template.list.constant'
import { TemplateService } from '../services/template.service'
import { GetTemplate } from '../decorators/template.decorator'
import { TemplateRequestDto } from '../dtos/template.request.dto'
import { TemplateEntity } from '../repository/entities/template.entity'
import { ENUM_TEMPLATE_TYPE } from '../constants/template.enum.constant'
import { TemplateAdminGetGuard } from '../decorators/template.admin.decorator'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { TemplateGetSerialization } from '../serializations/template.get.serialization'
import { TemplatePublicGetDoc, TemplatePublicListDoc } from '../docs/template.public.doc'
import { TemplateListSerialization } from '../serializations/template.list.serialization'

@ApiTags('Modules.Public.template')
@Controller({ version: '1', path: '/template' })
export class TemplatePublicController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly paginationService: PaginationService
  ) {}

  @TemplatePublicListDoc()
  @ResponsePaging('template.list', {
    serialization: TemplateListSerialization,
  })
  @Get('/')
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

  @TemplatePublicGetDoc()
  @Response('template.get', {
    serialization: TemplateGetSerialization,
  })
  @TemplateAdminGetGuard()
  @RequestParamGuard(TemplateRequestDto)
  @Get('/:template')
  async get(@GetTemplate(true) template: TemplateEntity): Promise<IResponse> {
    return { data: template }
  }
}
