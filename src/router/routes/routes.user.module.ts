import { Module } from '@nestjs/common'
import { RoleModule } from 'src/modules/role/role.module'
import { UserModule } from 'src/modules/user/user.module'

import { InputModule } from 'src/modules/inputs/input.module'
import { PromptModule } from 'src/modules/prompts/prompt.module'
import { HistoryModule } from 'src/modules/history/history.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { UserPlanModule } from 'src/modules/user-plan/user-plan.module'

import { UserUserController } from 'src/modules/user/controllers/user.user.controller'
import { HistoryUserController } from 'src/modules/history/controllers/history.user.controller'
import { PlanModule } from 'src/modules/plan/plan.module'

@Module({
  controllers: [UserUserController, HistoryUserController],
  providers: [],
  exports: [],
  imports: [
    UserModule,
    RoleModule,
    CategoryModule,
    PromptModule,
    InputModule,
    HistoryModule,
    PlanModule,
    UserPlanModule,
  ],
})
export class RoutesUserModule {}
