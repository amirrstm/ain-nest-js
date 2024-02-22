import { Module } from '@nestjs/common'

import { AuthModule } from 'src/common/auth/auth.module'
import { RoleModule } from 'src/modules/role/role.module'
import { UserModule } from 'src/modules/user/user.module'
import { EmailModule } from 'src/modules/email/email.module'
import { InputModule } from 'src/modules/inputs/input.module'
import { PromptModule } from 'src/modules/prompts/prompt.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { CategoryModule } from 'src/modules/category/category.module'

import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller'
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller'
import { InputAdminController } from 'src/modules/inputs/controllers/input.admin.controller'
import { PromptAdminController } from 'src/modules/prompts/controllers/prompt.admin.controller'
import { SettingAdminController } from 'src/modules/setting/controllers/setting.admin.controller'
import { CategoryAdminController } from 'src/modules/category/controllers/category.admin.controller'

@Module({
  controllers: [
    SettingAdminController,
    RoleAdminController,
    UserAdminController,
    CategoryAdminController,
    PromptAdminController,
    InputAdminController,
  ],
  providers: [],
  exports: [],
  imports: [RoleModule, UserModule, AuthModule, SettingModule, EmailModule, CategoryModule, PromptModule, InputModule],
})
export class RoutesAdminModule {}
