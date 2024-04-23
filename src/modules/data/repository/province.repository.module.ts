import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProvinceRepository } from './repositories/province.repository'
import { ProvinceEntity, ProvinceSchema } from './entities/province.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [ProvinceRepository],
  providers: [ProvinceRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ProvinceEntity.name,
          schema: ProvinceSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class ProvinceRepositoryModule {}
