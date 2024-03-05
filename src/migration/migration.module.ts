import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'
import { AuthModule } from 'src/common/auth/auth.module'
import { CommonModule } from 'src/common/common.module'
import { UserModule } from 'src/modules/user/user.module'
import { RoleModule } from 'src/modules/role/role.module'
import { PlanModule } from 'src/modules/plan/plan.module'
import { EmailModule } from 'src/modules/email/email.module'
import { CategoryModule } from 'src/modules/category/category.module'

import { MigrationPlanSeed } from './seeds/migration.plan.seed'
import { MigrationRoleSeed } from './seeds/migration.role.seed'
import { MigrationUserSeed } from './seeds/migration.user.seed'
import { MigrationCategorySeed } from './seeds/migration.category.seed'

@Module({
  imports: [CommonModule, CommandModule, AuthModule, RoleModule, UserModule, EmailModule, CategoryModule, PlanModule],
  providers: [MigrationRoleSeed, MigrationUserSeed, MigrationCategorySeed, MigrationPlanSeed],
  exports: [],
})
export class MigrationModule {}
