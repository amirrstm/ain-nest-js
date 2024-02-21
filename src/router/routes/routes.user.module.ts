import { Module } from '@nestjs/common'
import { RoleModule } from 'src/modules/role/role.module'
import { UserModule } from 'src/modules/user/user.module'

import { UserUserController } from 'src/modules/user/controllers/user.user.controller'

@Module({
  controllers: [UserUserController],
  providers: [],
  exports: [],
  imports: [UserModule, RoleModule],
})
export class RoutesUserModule {}
