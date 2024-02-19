import { Module } from '@nestjs/common'

import { CategoryService } from './services/category.service'
import { CategoryRepositoryModule } from './repository/category.repository.module'

@Module({
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService],
  imports: [CategoryRepositoryModule],
})
export class CategoryModule {}
