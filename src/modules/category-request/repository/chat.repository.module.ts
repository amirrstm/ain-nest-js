import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoryRequestRepository } from './repositories/category-request.repository'
import { CategoryRequestEntity, CategoryRequestSchema } from './entities/category-request.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [CategoryRequestRepository],
  providers: [CategoryRequestRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: CategoryRequestEntity.name,
          schema: CategoryRequestSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class CategoryRequestRepositoryModule {}
