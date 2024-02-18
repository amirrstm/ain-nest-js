import { Module } from '@nestjs/common'

import { AuthModule } from 'src/common/auth/auth.module'
import { UserModule } from 'src/modules/user/user.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller'

@Module({
  controllers: [UserAuthController],
  providers: [],
  exports: [],
  imports: [UserModule, AuthModule, SettingModule],
})
export class RoutesAuthModule {}
