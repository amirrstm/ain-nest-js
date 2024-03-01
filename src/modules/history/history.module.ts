import { Module } from '@nestjs/common'

import { HistoryService } from './services/history.service'
import { HistoryRepositoryModule } from './repository/history.repository.module'

@Module({
  controllers: [],
  providers: [HistoryService],
  exports: [HistoryService],
  imports: [HistoryRepositoryModule],
})
export class HistoryModule {}
