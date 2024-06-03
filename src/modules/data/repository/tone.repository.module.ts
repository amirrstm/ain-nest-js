import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ToneRepository } from './repositories/tone.repository'
import { ToneEntity, ToneSchema } from './entities/tone.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [ToneRepository],
  providers: [ToneRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ToneEntity.name,
          schema: ToneSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class ToneRepositoryModule {}
