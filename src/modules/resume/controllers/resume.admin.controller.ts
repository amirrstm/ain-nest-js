import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'

import { ResumeService } from '../services/resume.service'
import { ResumeAdminListDoc } from '../docs/resume.admin.doc'

import { ResumeEntity } from '../repository/entities/resume.entity'
import { ResumeListSerialization } from '../serializations/resume.list.serialization'
import {
  RESUME_DEFAULT_PER_PAGE,
  RESUME_DEFAULT_ORDER_BY,
  RESUME_DEFAULT_ORDER_DIRECTION,
  RESUME_DEFAULT_AVAILABLE_SEARCH,
  RESUME_DEFAULT_AVAILABLE_ORDER_BY,
} from '../constants/resume.list.constant'
import { PaginationService } from 'src/common/pagination/services/pagination.service'

@ApiTags('Modules.Admin.Resume')
@Controller({ version: '1', path: '/resume' })
export class ResumeAdminController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly paginationService: PaginationService
  ) {}

  @ResumeAdminListDoc()
  @ResponsePaging('resume.list', { serialization: ResumeListSerialization })
  @PolicyAbilityProtected({ subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      RESUME_DEFAULT_PER_PAGE,
      RESUME_DEFAULT_ORDER_BY,
      RESUME_DEFAULT_ORDER_DIRECTION,
      RESUME_DEFAULT_AVAILABLE_SEARCH,
      RESUME_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @Query() query: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search, user: query.user }

    const resumes: ResumeEntity[] = await this.resumeService.findAll<ResumeEntity>(find, {
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

    const total: number = await this.resumeService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return { _pagination: { total, totalPage }, data: resumes }
  }
}
