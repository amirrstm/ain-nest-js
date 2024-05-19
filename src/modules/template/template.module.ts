import { Module } from '@nestjs/common'

import { TemplateService } from './services/template.service'
import { TemplateRepositoryModule } from './repository/template.repository.module'

@Module({
  controllers: [],
  providers: [TemplateService],
  exports: [TemplateService],
  imports: [TemplateRepositoryModule],
})
export class TemplateModule {}
