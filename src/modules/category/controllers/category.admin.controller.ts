import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { ENUM_POLICY_ACTION, ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant'
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator'
import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'

import { CategoryAdminCreateDoc } from '../docs/category.admin.doc'
import { CategoryCreateDto } from '../dto/category.create.dto'
import { CategoryService } from '../services/category.service'
import { ENUM_CATEGORY_STATUS_CODE_ERROR } from '../constants/category.status-code.constant'

@ApiTags('Modules.Admin.Category')
@Controller({ version: '1', path: '/category' })
export class CategoryAdminController {
  constructor(private readonly categoryService: CategoryService) {}

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
    { name, parent, slug, description }: CategoryCreateDto
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
      parent,
      description,
    })

    return {
      data: { _id: create._id },
    }
  }
}
