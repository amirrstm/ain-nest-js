import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CompanyRepository } from './repositories/company.repository'
import { CompanyEntity, CompanySchema } from './entities/company.entity'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  exports: [CompanyRepository],
  providers: [CompanyRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: CompanyEntity.name,
          schema: CompanySchema,
        },
      ],
      DATABASE_CONNECTION_NAME
    ),
  ],
})
export class CompanyRepositoryModule {}
