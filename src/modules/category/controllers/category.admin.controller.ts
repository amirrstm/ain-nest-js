import { Body, ConflictException, Controller, Get, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import { CategoryAdminCreateDoc, CategoryAdminListDoc, CategoryAdminUpdateDoc } from '../docs/category.admin.doc'
import { CategoryCreateDto } from '../dto/category.create.dto'
import { CategoryService } from '../services/category.service'
import { ENUM_CATEGORY_STATUS_CODE_ERROR } from '../constants/category.status-code.constant'
import { CategoryRequestDto } from '../dto/category.request.dto'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { CategoryUpdateDto } from '../dto/category.update.dto'
import { CategoryAdminUpdateGuard, GetCategory } from '../decorators/category.admin.decorator'
import { CategoryDoc, CategoryEntity } from '../repository/entities/category.entity'
import { CategoryListSerialization } from '../serializations/category.list.serialization'
import { PaginationQuery, PaginationQueryFilterInBoolean } from 'src/common/pagination/decorators/pagination.decorator'
import {
  CATEGORY_DEFAULT_AVAILABLE_ORDER_BY,
  CATEGORY_DEFAULT_AVAILABLE_SEARCH,
  CATEGORY_DEFAULT_IS_ACTIVE,
  CATEGORY_DEFAULT_ORDER_BY,
  CATEGORY_DEFAULT_ORDER_DIRECTION,
  CATEGORY_DEFAULT_PER_PAGE,
} from '../constants/category.list.constant'
import { PaginationService } from 'src/common/pagination/services/pagination.service'

@ApiTags('Modules.Admin.Category')
@Controller({ version: '1', path: '/category' })
export class CategoryAdminController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly paginationService: PaginationService
  ) {}

  @CategoryAdminListDoc()
  @ResponsePaging('category.list', {
    serialization: CategoryListSerialization,
  })
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.ROLE,
    action: [ENUM_POLICY_ACTION.READ],
  })
  @AuthJwtAdminAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      CATEGORY_DEFAULT_PER_PAGE,
      CATEGORY_DEFAULT_ORDER_BY,
      CATEGORY_DEFAULT_ORDER_DIRECTION,
      CATEGORY_DEFAULT_AVAILABLE_SEARCH,
      CATEGORY_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', CATEGORY_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
    }

    const categories: CategoryEntity[] = await this.categoryService.findAll<CategoryEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
    })

    const total: number = await this.categoryService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      _pagination: { total, totalPage },
      data: categories,
    }
  }

  @CategoryAdminCreateDoc()
  @Response('category.create', {
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
    { name, parentId, slug, description }: CategoryCreateDto
  ): Promise<IResponse> {
    const exist: boolean = await this.categoryService.existBySlug(slug)

    if (exist) {
      throw new ConflictException({
        statusCode: ENUM_CATEGORY_STATUS_CODE_ERROR.CATEGORY_EXIST_ERROR,
        message: 'category.error.exist',
      })
    }

    const create = await this.categoryService.create({
      name,
      slug,
      parentId,
      description,
    })

    return {
      data: { _id: create._id },
    }
  }

  @CategoryAdminUpdateDoc()
  @Response('category.update', {
    serialization: ResponseIdSerialization,
  })
  @CategoryAdminUpdateGuard()
  @PolicyAbilityProtected({
    subject: ENUM_POLICY_SUBJECT.USER,
    action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE],
  })
  @AuthJwtAdminAccessProtected()
  @RequestParamGuard(CategoryRequestDto)
  @Put('/update/:category')
  async update(
    @GetCategory()
    category: CategoryDoc,
    @Body()
    body: CategoryUpdateDto
  ): Promise<IResponse> {
    await this.categoryService.update(category, body)

    return {
      data: { _id: category._id },
    }
  }
}
