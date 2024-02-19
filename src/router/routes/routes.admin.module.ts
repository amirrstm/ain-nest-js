import { Module } from '@nestjs/common'
import { AuthModule } from 'src/common/auth/auth.module'
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller'
import { RoleModule } from 'src/modules/role/role.module'
import { SettingAdminController } from 'src/modules/setting/controllers/setting.admin.controller'
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller'
import { UserModule } from 'src/modules/user/user.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { EmailModule } from 'src/modules/email/email.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { CategoryAdminController } from 'src/modules/category/controllers/category.admin.controller'

@Module({
  controllers: [SettingAdminController, RoleAdminController, UserAdminController, CategoryAdminController],
  providers: [],
  exports: [],
  imports: [RoleModule, UserModule, AuthModule, SettingModule, EmailModule, CategoryModule],
})
export class RoutesAdminModule {}
