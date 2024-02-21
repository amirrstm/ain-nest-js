import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PromptRepository } from './repositories/prompt.repository'
import { PromptEntity, PromptSchema } from './entities/prompt.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [PromptRepository],
  providers: [PromptRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: PromptEntity.name,
          schema: PromptSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class PromptRepositoryModule {}
