import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { AuthModule } from 'src/common/auth/auth.module'
import { HealthModule } from 'src/health/health.module'

import { OtpModule } from 'src/modules/otp/otp.module'
import { UserModule } from 'src/modules/user/user.module'
import { RoleModule } from 'src/modules/role/role.module'
import { EmailModule } from 'src/modules/email/email.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { CategoryModule } from 'src/modules/category/category.module'

import { HealthPublicController } from 'src/health/controllers/health.public.controller'
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller'
import { SettingPublicController } from 'src/modules/setting/controllers/setting.public.controller'
import { CategoryPublicController } from 'src/modules/category/controllers/category.public.controller'

@Module({
  controllers: [HealthPublicController, SettingPublicController, UserPublicController, CategoryPublicController],
  providers: [],
  exports: [],
  imports: [
    TerminusModule,
    HealthModule,
    UserModule,
    AuthModule,
    RoleModule,
    SettingModule,
    EmailModule,
    OtpModule,
    CategoryModule,
  ],
})
export class RoutesPublicModule {}
