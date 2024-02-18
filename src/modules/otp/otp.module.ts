import { Module } from '@nestjs/common'
import { OtpRepositoryModule } from './repository/otp.repository.module'

@Module({
  exports: [],
  providers: [],
  controllers: [],
  imports: [OtpRepositoryModule],
})
export class OtpModule {}
