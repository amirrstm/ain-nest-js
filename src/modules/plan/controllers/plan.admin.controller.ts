import { Body, ConflictException, Controller, Get, Patch, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import {
  PlanAdminListDoc,
  PlanAdminGetDoc,
  PlanAdminUpdateDoc,
  PlanAdminCreateDoc,
  PlanAdminDefaultDoc,
} from '../docs/plan.admin.doc'
import { PlanCreateDto } from '../dto/plan.create.dto'
import { PlanService } from '../services/plan.service'
import { ENUM_PLAN_STATUS_CODE_ERROR } from '../constants/plan.status-code.constant'
import { PlanRequestDto } from '../dto/plan.request.dto'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { PlanUpdateDto } from '../dto/plan.update.dto'
import {
  PlanAdminGetGuard,
  PlanAdminUpdateGuard,
  GetPlan,
  PlanAdminUpdateDefaultGuard,
} from '../decorators/plan.admin.decorator'
import { PlanDoc, PlanEntity } from '../repository/entities/plan.entity'
import { PlanListSerialization } from '../serializations/plan.list.serialization'
import { PaginationQuery, PaginationQueryFilterInBoolean } from 'src/common/pagination/decorators/pagination.decorator'
import {
  PLAN_DEFAULT_AVAILABLE_ORDER_BY,
  PLAN_DEFAULT_AVAILABLE_SEARCH,
  PLAN_DEFAULT_IS_ACTIVE,
  PLAN_DEFAULT_ORDER_BY,
  PLAN_DEFAULT_ORDER_DIRECTION,
  PLAN_DEFAULT_PER_PAGE,
} from '../constants/plan.list.constant'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { PlanGetSerialization } from '../serializations/plan.get.serialization'

@ApiTags('Modules.Admin.Plan')
@Controller({ version: '1', path: '/plan' })
export class PlanAdminController {
  constructor(
    private readonly planService: PlanService,
    private readonly paginationService: PaginationService
  ) {}

  @PlanAdminListDoc()
  @ResponsePaging('plan.list', {
    serialization: PlanListSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      PLAN_DEFAULT_PER_PAGE,
      PLAN_DEFAULT_ORDER_BY,
      PLAN_DEFAULT_ORDER_DIRECTION,
      PLAN_DEFAULT_AVAILABLE_SEARCH,
      PLAN_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', PLAN_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
    }

    const categories: PlanEntity[] = await this.planService.findAll<PlanEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
    })

    const total: number = await this.planService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      _pagination: { total, totalPage },
      data: categories,
    }
  }

  @PlanAdminGetDoc()
  @Response('plan.get', {
    serialization: PlanGetSerialization,
  })
  @PlanAdminGetGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(PlanRequestDto)
  @Get('get/:plan')
  async get(@GetPlan() plan: PlanEntity): Promise<IResponse> {
    return { data: plan }
  }

  @PlanAdminCreateDoc()
  @Response('plan.create', {
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
    {
      name,
      slug,
      description,
      features,
      generation,
      models,
      offForAnnual,
      price,
      isDefault,
      resumeAI,
      resumeCustom,
      resumeVoice,
    }: PlanCreateDto
  ): Promise<IResponse> {
    const exist: boolean = await this.planService.existBySlug(slug)

    if (exist) {
      throw new ConflictException({
        statusCode: ENUM_PLAN_STATUS_CODE_ERROR.PLAN_EXIST_ERROR,
        message: 'plan.error.exist',
      })
    }

    if (isDefault) {
      const defaultPlan: PlanDoc = await this.planService.findDefault()

      if (defaultPlan) {
        await this.planService.removeDefault(defaultPlan)
      }
    }

    const create = await this.planService.create({
      name,
      slug,
      price,
      models,
      features,
      resumeAI,
      isDefault,
      generation,
      resumeVoice,
      description,
      resumeCustom,
      offForAnnual,
    })

    return {
      data: { _id: create._id },
    }
  }

  @PlanAdminUpdateDoc()
  @Response('plan.update', {
    serialization: ResponseIdSerialization,
  })
  @PlanAdminUpdateGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.USER,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(PlanRequestDto)
  @Put('/update/:plan')
  async update(
    @GetPlan()
    plan: PlanDoc,
    @Body()
    body: PlanUpdateDto
  ): Promise<IResponse> {
    await this.planService.update(plan, body)

    return {
      data: { _id: plan._id },
    }
  }

  @PlanAdminDefaultDoc()
  @Response('plan.default')
  @PlanAdminUpdateDefaultGuard()
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(PlanRequestDto)
  @Patch('/update/:plan/default')
  async makeDefault(@GetPlan() plan: PlanDoc): Promise<void> {
    const defaultPlan: PlanDoc = await this.planService.findDefault()

    if (defaultPlan && defaultPlan._id !== plan._id) {
      await this.planService.removeDefault(defaultPlan)
    }

    await this.planService.makeDefault(plan)

    return
  }
}
