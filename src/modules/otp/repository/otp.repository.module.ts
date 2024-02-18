import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

import { OtpEntity, OtpSchema } from './entities/otp.entity'
import { OtpRepository } from './repositories/otp.repository'

@Module({
  providers: [OtpRepository],
  exports: [OtpRepository],
  controllers: [],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: OtpEntity.name,
          schema: OtpSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class OtpRepositoryModule {}
