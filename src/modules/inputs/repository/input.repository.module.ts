import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { InputRepository } from './repositories/input.repository'
import { InputEntity, InputSchema } from './entities/input.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [InputRepository],
  providers: [InputRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: InputEntity.name,
          schema: InputSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class InputRepositoryModule {}
