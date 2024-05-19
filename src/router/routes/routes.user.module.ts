import { Module } from '@nestjs/common'
import { RoleModule } from 'src/modules/role/role.module'
import { UserModule } from 'src/modules/user/user.module'

import { AwsModule } from 'src/common/aws/aws.module'
import { PlanModule } from 'src/modules/plan/plan.module'
import { ChatModule } from 'src/modules/chat/chat.module'
import { InputModule } from 'src/modules/inputs/input.module'
import { ResumeModule } from 'src/modules/resume/resume.module'
import { PromptModule } from 'src/modules/prompts/prompt.module'
import { HistoryModule } from 'src/modules/history/history.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { TemplateModule } from 'src/modules/template/template.module'
import { UserPlanModule } from 'src/modules/user-plan/user-plan.module'
import { CategoryRequestModule } from 'src/modules/category-request/category-request.module'

import { ChatUserController } from 'src/modules/chat/controllers/chat.user.controller'
import { UserUserController } from 'src/modules/user/controllers/user.user.controller'
import { ResumeUserController } from 'src/modules/resume/controllers/resume.user.controller'
import { HistoryUserController } from 'src/modules/history/controllers/history.user.controller'
import { CategoryRequestUserController } from 'src/modules/category-request/controllers/category-request.user.controller'

@Module({
  controllers: [
    UserUserController,
    HistoryUserController,
    ResumeUserController,
    ChatUserController,
    CategoryRequestUserController,
  ],
  providers: [],
  exports: [],
  imports: [
    AwsModule,
    UserModule,
    RoleModule,
    CategoryModule,
    PromptModule,
    InputModule,
    HistoryModule,
    PlanModule,
    UserPlanModule,
    ChatModule,
    ResumeModule,
    TemplateModule,
    CategoryRequestModule,
  ],
})
export class RoutesUserModule {}
