import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'
import { AuthModule } from 'src/common/auth/auth.module'
import { CommonModule } from 'src/common/common.module'
import { UserModule } from 'src/modules/user/user.module'
import { RoleModule } from 'src/modules/role/role.module'
import { EmailModule } from 'src/modules/email/email.module'
import { MigrationRoleSeed } from 'src/migration/seeds/migration.role.seed'
import { MigrationUserSeed } from 'src/migration/seeds/migration.user.seed'

@Module({
  imports: [CommonModule, CommandModule, AuthModule, RoleModule, UserModule, EmailModule],
  providers: [MigrationRoleSeed, MigrationUserSeed],
  exports: [],
})
export class MigrationModule {}
