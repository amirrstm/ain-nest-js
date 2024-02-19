import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IResponse } from 'src/common/response/interfaces/response.interface'

import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'

import { CategoryService } from '../services/category.service'
import { CategoryPublicListDoc } from '../docs/category.public.doc'
import { Response } from 'src/common/response/decorators/response.decorator'
import { CategoryListSerialization } from '../serializations/category.list.serialization'
import { ICategoryEntity } from '../interfaces/category.interface'

@ApiTags('Modules.Public.Category')
@Controller({ version: '1', path: '/category' })
export class CategoryPublicController {
  constructor(private readonly categoryService: CategoryService) {}

  @CategoryPublicListDoc()
  @Response('category.list', {
    serialization: CategoryListSerialization,
  })
  @Get('/list')
  async list(): Promise<IResponse> {
    const categories: ICategoryEntity[] = await this.categoryService.findAll<ICategoryEntity>()

    return {
      data: categories,
    }
  }
}
