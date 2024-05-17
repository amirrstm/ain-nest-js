import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { AuthModule } from 'src/common/auth/auth.module'
import { HealthModule } from 'src/health/health.module'

import { OtpModule } from 'src/modules/otp/otp.module'
import { UserModule } from 'src/modules/user/user.module'
import { RoleModule } from 'src/modules/role/role.module'
import { PlanModule } from 'src/modules/plan/plan.module'
import { DataModule } from 'src/modules/data/data.module'
import { EmailModule } from 'src/modules/email/email.module'
import { InputModule } from 'src/modules/inputs/input.module'
import { ResumeModule } from 'src/modules/resume/resume.module'
import { PromptModule } from 'src/modules/prompts/prompt.module'
import { SettingModule } from 'src/modules/setting/setting.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { UserPlanModule } from 'src/modules/user-plan/user-plan.module'

import { HealthPublicController } from 'src/health/controllers/health.public.controller'
import { UserPublicController } from 'src/modules/user/controllers/user.public.controller'
import { PlanPublicController } from 'src/modules/plan/controllers/plan.public.controller'
import { SkillPublicController } from 'src/modules/data/controllers/skill.public.controller'
import { CompanyPublicController } from 'src/modules/data/controllers/company.public.controller'
import { ResumePublicController } from 'src/modules/resume/controllers/resume.public.controller'
import { ProvincePublicController } from 'src/modules/data/controllers/province.public.controller'
import { SettingPublicController } from 'src/modules/setting/controllers/setting.public.controller'
import { CategoryPublicController } from 'src/modules/category/controllers/category.public.controller'
import { OccupationPublicController } from 'src/modules/data/controllers/occupation.public.controller'
import { UniversityPublicController } from 'src/modules/data/controllers/university.public.controller'
import { StudyFieldPublicController } from 'src/modules/data/controllers/study-field.public.controller'

@Module({
  controllers: [
    HealthPublicController,
    SettingPublicController,
    UserPublicController,
    CategoryPublicController,
    PlanPublicController,
    SkillPublicController,
    ResumePublicController,
    CompanyPublicController,
    ProvincePublicController,
    OccupationPublicController,
    StudyFieldPublicController,
    UniversityPublicController,
  ],
  providers: [],
  exports: [],
  imports: [
    TerminusModule,
    HealthModule,
    UserModule,
    AuthModule,
    RoleModule,
    SettingModule,
    EmailModule,
    OtpModule,
    CategoryModule,
    PlanModule,
    UserPlanModule,
    PromptModule,
    InputModule,
    ResumeModule,
    DataModule,
  ],
})
export class RoutesPublicModule {}
