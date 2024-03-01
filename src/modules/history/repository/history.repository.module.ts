import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { HistoryRepository } from './repositories/history.repository'
import { HistoryEntity, HistorySchema } from './entities/history.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [HistoryRepository],
  providers: [HistoryRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: HistoryEntity.name,
          schema: HistorySchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class HistoryRepositoryModule {}
