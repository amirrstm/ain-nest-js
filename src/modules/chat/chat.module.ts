import { Module } from '@nestjs/common'

import { ChatService } from './services/chat.service'
import { ChatRepositoryModule } from './repository/chat.repository.module'

@Module({
  controllers: [],
  providers: [ChatService],
  exports: [ChatService],
  imports: [ChatRepositoryModule],
})
export class ChatModule {}
