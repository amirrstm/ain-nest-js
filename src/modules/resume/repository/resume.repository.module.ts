import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

import { ResumeRepository } from './repositories/resume.repository'
import { ResumeEntity, ResumeSchema } from './entities/resume.entity'

@Module({
  providers: [ResumeRepository],
  exports: [ResumeRepository],
  controllers: [],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ResumeEntity.name,
          schema: ResumeSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class ResumeRepositoryModule {}
