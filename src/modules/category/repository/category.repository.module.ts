import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoryRepository } from './repositories/category.repository'
import { CategoryEntity, CategorySchema } from './entities/category.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [CategoryRepository],
  providers: [CategoryRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: CategoryEntity.name,
          schema: CategorySchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class CategoryRepositoryModule {}
