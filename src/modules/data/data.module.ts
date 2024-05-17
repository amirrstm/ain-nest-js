import { Module } from '@nestjs/common'

import { SkillService } from './services/skill.service'
import { CompanyService } from './services/company.service'
import { ProvinceService } from './services/province.service'
import { OccupationService } from './services/occupation.service'
import { UniversityService } from './services/university.service'
import { StudyFieldService } from './services/study-field.service'

import { SkillRepositoryModule } from './repository/skill.repository.module'
import { CompanyRepositoryModule } from './repository/company.repository.module'
import { ProvinceRepositoryModule } from './repository/province.repository.module'
import { OccupationRepositoryModule } from './repository/occupation.repository.module'
import { UniversityRepositoryModule } from './repository/university.repository.module'
import { StudyFieldRepositoryModule } from './repository/study-field.repository.module'

@Module({
  controllers: [],
  providers: [ProvinceService, OccupationService, StudyFieldService, UniversityService, CompanyService, SkillService],
  exports: [ProvinceService, OccupationService, StudyFieldService, UniversityService, CompanyService, SkillService],
  imports: [
    SkillRepositoryModule,
    CompanyRepositoryModule,
    ProvinceRepositoryModule,
    OccupationRepositoryModule,
    StudyFieldRepositoryModule,
    UniversityRepositoryModule,
  ],
})
export class DataModule {}
