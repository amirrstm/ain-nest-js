import { Body, Controller, Delete, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserService } from 'src/modules/user/services/user.service'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { Response } from 'src/common/response/decorators/response.decorator'
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { UserUserDeleteSelfDoc, UserUserUpdateNameDoc } from 'src/modules/user/docs/user.user.doc'

import { UserUpdateNameDto } from '../dtos/user.update-name.dto'
import { IResponse } from 'src/common/response/interfaces/response.interface'

@ApiTags('Module.User.User')
@Controller({
  version: '1',
  path: '/user',
})
export class UserUserController {
  constructor(private readonly userService: UserService) {}

  @UserUserUpdateNameDoc()
  @Response('user.updateProfile')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Put('/update-name')
  async updateProfile(@GetUser() user: UserDoc, @Body() body: UserUpdateNameDto): Promise<IResponse> {
    const userUpdated = await this.userService.updateName(user, body)

    return { data: userUpdated }
  }

  @UserUserDeleteSelfDoc()
  @Response('user.deleteSelf')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Delete('/delete')
  async deleteSelf(@GetUser() user: UserDoc): Promise<void> {
    await this.userService.inactivePermanent(user)

    return
  }
}
