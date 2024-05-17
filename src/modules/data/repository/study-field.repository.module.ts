import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { StudyFieldRepository } from './repositories/study-field.repository'
import { StudyFieldEntity, StudyFieldSchema } from './entities/study-field.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [StudyFieldRepository],
  providers: [StudyFieldRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: StudyFieldEntity.name,
          schema: StudyFieldSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class StudyFieldRepositoryModule {}
