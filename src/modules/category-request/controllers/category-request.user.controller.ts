import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'

import { CategoryRequestService } from '../services/category-request.service'
import { CategoryRequestUserCreateDoc } from '../docs/category-request.user.doc'
import { CategoryRequestCreateDto } from '../dto/category-request.create.dto'

@ApiTags('Modules.User.CategoryRequest')
@Controller({ version: '1', path: '/category-request' })
export class CategoryRequestUserController {
  constructor(private readonly requestService: CategoryRequestService) {}

  @CategoryRequestUserCreateDoc()
  @Response('category-request.create')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Post('/')
  async message(@GetUser() user: UserDoc, @Body() body: Omit<CategoryRequestCreateDto, 'user'>): Promise<IResponse> {
    const create = await this.requestService.create({ user: user._id, ...body })
    return { data: create._id }
  }
}
