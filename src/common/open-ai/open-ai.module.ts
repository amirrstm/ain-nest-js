import { Global, Module } from '@nestjs/common'

import { OpenAIService } from './services/open-ai.service'

@Global()
@Module({
  imports: [],
  controllers: [],
  exports: [OpenAIService],
  providers: [OpenAIService],
})
export class OpenAIModule {}
