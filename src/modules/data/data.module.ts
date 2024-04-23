import { Module } from '@nestjs/common'

import { ProvinceService } from './services/province.service'
import { OccupationService } from './services/occupation.service'

import { ProvinceRepositoryModule } from './repository/province.repository.module'
import { OccupationRepositoryModule } from './repository/occupation.repository.module'

@Module({
  controllers: [],
  providers: [ProvinceService, OccupationService],
  exports: [ProvinceService, OccupationService],
  imports: [ProvinceRepositoryModule, OccupationRepositoryModule],
})
export class DataModule {}
