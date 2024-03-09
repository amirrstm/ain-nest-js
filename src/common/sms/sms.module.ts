import { Global, Module } from '@nestjs/common'

import { SmsService } from './services/sms.service'

@Global()
@Module({
  imports: [],
  controllers: [],
  exports: [SmsService],
  providers: [SmsService],
})
export class SmsModule {}
