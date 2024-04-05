import { Module } from '@nestjs/common'
import { AwsService } from './services/aws.service'

@Module({
  exports: [AwsService],
  providers: [AwsService],
  imports: [],
  controllers: [],
})
export class AwsModule {}
