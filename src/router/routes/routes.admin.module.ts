import { Module } from '@nestjs/common'
import { AuthModule } from 'src/common/auth/auth.module'
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller'
import { RoleModule } from 'src/modules/role/role.module'
import { SettingAdminController } from 'src/modules/setting/controllers/setting.admin.controller'
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller'
import { UserModule } from 'src/modules/user/user.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { EmailModule } from 'src/modules/email/email.module'

@Module({
  controllers: [SettingAdminController, RoleAdminController, UserAdminController],
  providers: [],
  exports: [],
  imports: [RoleModule, UserModule, AuthModule, SettingModule, EmailModule],
})
export class RoutesAdminModule {}
