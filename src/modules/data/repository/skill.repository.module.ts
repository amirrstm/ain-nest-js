import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { SkillRepository } from './repositories/skill.repository'
import { SkillEntity, SkillSchema } from './entities/skill.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [SkillRepository],
  providers: [SkillRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: SkillEntity.name,
          schema: SkillSchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class SkillRepositoryModule {}
