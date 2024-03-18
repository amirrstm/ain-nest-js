import { Module } from '@nestjs/common'

import { ResumeService } from './services/resume.service'
import { ResumeRepositoryModule } from './repository/resume.repository.module'

@Module({
  controllers: [],
  providers: [ResumeService],
  exports: [ResumeService],
  imports: [ResumeRepositoryModule],
})
export class ResumeModule {}
