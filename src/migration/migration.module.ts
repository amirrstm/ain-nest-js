import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'

import { AuthModule } from 'src/common/auth/auth.module'
import { CommonModule } from 'src/common/common.module'
import { UserModule } from 'src/modules/user/user.module'
import { RoleModule } from 'src/modules/role/role.module'
import { PlanModule } from 'src/modules/plan/plan.module'
import { DataModule } from 'src/modules/data/data.module'
import { EmailModule } from 'src/modules/email/email.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { TemplateModule } from 'src/modules/template/template.module'

import { MigrationPlanSeed } from './seeds/migration.plan.seed'
import { MigrationRoleSeed } from './seeds/migration.role.seed'
import { MigrationUserSeed } from './seeds/migration.user.seed'
import { MigrationToneSeed } from './seeds/migration.tone.seed'
import { MigrationCategorySeed } from './seeds/migration.category.seed'
import { MigrationProvinceSeed } from './seeds/migration.province.seed'
import { MigrationTemplateSeed } from './seeds/migration.template.seed'

@Module({
  imports: [
    CommonModule,
    CommandModule,
    AuthModule,
    RoleModule,
    UserModule,
    EmailModule,
    PlanModule,
    DataModule,
    TemplateModule,
    CategoryModule,
  ],
  providers: [
    MigrationRoleSeed,
    MigrationUserSeed,
    MigrationToneSeed,
    MigrationPlanSeed,
    MigrationCategorySeed,
    MigrationProvinceSeed,
    MigrationTemplateSeed,
  ],
  exports: [],
})
export class MigrationModule {}
