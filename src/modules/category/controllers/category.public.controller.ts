import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'
import { IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { PaginationQuery, PaginationQueryFilterInBoolean } from 'src/common/pagination/decorators/pagination.decorator'

import { CategoryService } from '../services/category.service'
import { CategoryPublicListDoc } from '../docs/category.public.doc'
import { ICategoryEntity } from '../interfaces/category.interface'
import { CategoryListSerialization } from '../serializations/category.list.serialization'
import {
  CATEGORY_DEFAULT_AVAILABLE_ORDER_BY,
  CATEGORY_DEFAULT_AVAILABLE_SEARCH,
  CATEGORY_DEFAULT_IS_ACTIVE,
  CATEGORY_DEFAULT_ORDER_BY,
  CATEGORY_DEFAULT_ORDER_DIRECTION,
  CATEGORY_DEFAULT_PER_PAGE,
} from '../constants/category.list.constant'

@ApiTags('Modules.Public.Category')
@Controller({ version: '1', path: '/category' })
export class CategoryPublicController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly paginationService: PaginationService
  ) {}

  @CategoryPublicListDoc()
  @ResponsePaging('category.list', {
    serialization: CategoryListSerialization,
  })
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
    isActive: Record<string, any>,
    @RequestCustomLang()
    customLang: string
  ): Promise<IResponsePaging> {
    const search: Record<string, any> = {
      ..._search,
      ...isActive,
    }

    const defaultLanguage: string = 'en'
    const nonTranslatedFields: Record<string, number> = {
      _id: 1,
      slug: 1,
      children: 1,
      isActive: 1,
    }
    const rawCategories: ICategoryEntity[] = await this.categoryService.rawFindAll<ICategoryEntity>(
      [
        {
          $match: {
            parentId: null,
            isActive: true,
          },
        },
        {
          $project: {
            ...nonTranslatedFields,
            name: { $ifNull: [`$name.${customLang}`, `$name.${defaultLanguage}`] },
            description: { $ifNull: [`$description.${customLang}`, `$description.${defaultLanguage}`] },
          },
        },
      ],
      {
        search,
        paging: {
          limit: _limit,
          offset: _offset,
        },
        order: _order,
      }
    )

    const populateChildren = async (category: ICategoryEntity) => {
      const childrenAggregation = [
        {
          $match: {
            isActive: true,
            parentId: category._id,
          },
        },
        {
          $addFields: {
            children: {
              $map: {
                input: '$children',
                as: 'child',
                in: {
                  $mergeObjects: [
                    '$$child',
                    {
                      name: { $ifNull: [`$$child.name.${customLang}`, `$$child.name.${defaultLanguage}`] },
                      description: {
                        $ifNull: [`$$child.description.${customLang}`, `$$child.description.${defaultLanguage}`],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            ...nonTranslatedFields,
            name: { $ifNull: [`$name.${customLang}`, `$name.${defaultLanguage}`] },
            description: { $ifNull: [`$description.${customLang}`, `$description.${defaultLanguage}`] },
          },
        },
      ]

      const children = await this.categoryService.rawFindAll<ICategoryEntity>(childrenAggregation)
      category.children = children

      // Recursively fetch children for each child category
      for (const child of category.children) {
        await populateChildren(child)
      }
    }

    for (const category of rawCategories) {
      await populateChildren(category)
    }

    const total: number = await this.categoryService.getTotal(search)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return {
      data: rawCategories,
      _pagination: { total, totalPage },
    }
  }
}
