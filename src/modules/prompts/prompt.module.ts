import { Module } from '@nestjs/common'

import { PromptService } from './services/prompt.service'
import { PromptRepositoryModule } from './repository/prompt.repository.module'

@Module({
  controllers: [],
  providers: [PromptService],
  exports: [PromptService],
  imports: [PromptRepositoryModule],
})
export class PromptModule {}
