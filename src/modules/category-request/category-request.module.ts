import { Module } from '@nestjs/common'

import { CategoryRequestService } from './services/category-request.service'
import { CategoryRequestRepositoryModule } from './repository/chat.repository.module'

@Module({
  controllers: [],
  providers: [CategoryRequestService],
  exports: [CategoryRequestService],
  imports: [CategoryRequestRepositoryModule],
})
export class CategoryRequestModule {}
