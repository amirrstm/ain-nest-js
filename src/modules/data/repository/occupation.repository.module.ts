import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OccupationRepository } from './repositories/occupation.repository'
import { OccupationEntity, OccupationSchema } from './entities/occupation.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [OccupationRepository],
  providers: [OccupationRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: OccupationEntity.name,
          schema: OccupationSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class OccupationRepositoryModule {}
