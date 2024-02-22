import { Module } from '@nestjs/common'

import { InputService } from './services/input.service'
import { InputRepositoryModule } from './repository/input.repository.module'

@Module({
  controllers: [],
  providers: [InputService],
  exports: [InputService],
  imports: [InputRepositoryModule],
})
export class InputModule {}
