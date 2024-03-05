import { Module } from '@nestjs/common'
import { RoleModule } from 'src/modules/role/role.module'
import { UserModule } from 'src/modules/user/user.module'

import { UserUserController } from 'src/modules/user/controllers/user.user.controller'
import { CategoryModule } from 'src/modules/category/category.module'
import { PromptModule } from 'src/modules/prompts/prompt.module'
import { InputModule } from 'src/modules/inputs/input.module'
import { HistoryModule } from 'src/modules/history/history.module'
import { UserPlanModule } from 'src/modules/user-plan/user-plan.module'

@Module({
  controllers: [UserUserController],
  providers: [],
  exports: [],
  imports: [UserModule, RoleModule, CategoryModule, PromptModule, InputModule, HistoryModule, UserPlanModule],
})
export class RoutesUserModule {}
