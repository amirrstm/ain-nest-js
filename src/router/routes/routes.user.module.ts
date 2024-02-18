import { Module } from '@nestjs/common'
import { RoleModule } from 'src/modules/role/role.module'
import { UserUserController } from 'src/modules/user/controllers/user.user.controller'
import { UserModule } from 'src/modules/user/user.module'

@Module({
  controllers: [UserUserController],
  providers: [],
  exports: [],
  imports: [UserModule, RoleModule],
})
export class RoutesUserModule {}
