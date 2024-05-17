import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UniversityRepository } from './repositories/university.repository'
import { UniversityEntity, UniversitySchema } from './entities/university.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [UniversityRepository],
  providers: [UniversityRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UniversityEntity.name,
          schema: UniversitySchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class UniversityRepositoryModule {}
