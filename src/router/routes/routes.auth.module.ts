import { Module } from '@nestjs/common'

import { OtpModule } from 'src/modules/otp/otp.module'
import { AuthModule } from 'src/common/auth/auth.module'
import { UserModule } from 'src/modules/user/user.module'
import { PlanModule } from 'src/modules/plan/plan.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { UserPlanModule } from 'src/modules/user-plan/user-plan.module'

import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller'
import { RoleModule } from 'src/modules/role/role.module'

@Module({
  controllers: [UserAuthController],
  providers: [],
  exports: [],
  imports: [UserModule, AuthModule, SettingModule, OtpModule, RoleModule, UserPlanModule, PlanModule],
})
export class RoutesAuthModule {}
