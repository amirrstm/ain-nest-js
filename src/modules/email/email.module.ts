import { Module } from '@nestjs/common'
import { EmailService } from 'src/modules/email/services/email.service'

@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
