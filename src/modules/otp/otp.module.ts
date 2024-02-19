import { Module } from '@nestjs/common'
import { OtpRepositoryModule } from './repository/otp.repository.module'
import { OtpService } from './services/otp.service'

@Module({
  exports: [OtpService],
  providers: [OtpService],
  controllers: [],
  imports: [OtpRepositoryModule],
})
export class OtpModule {}
