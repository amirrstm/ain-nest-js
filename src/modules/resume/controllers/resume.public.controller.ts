import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Render } from '@nestjs/common'

import { ResumeService } from '../services/resume.service'
import { HelperDateService } from 'src/common/helper/services/helper.date.service'
import { ResumeDoc } from '../repository/entities/resume.entity'

@ApiTags('Modules.Public.Resume')
@Controller({ version: '1', path: '/resume' })
export class ResumePublicController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly helperDateService: HelperDateService
  ) {}

  @Get('/:resumeId')
  @Render('templates/pdf/basic')
  async overview(@Param() params: Record<string, string>): Promise<any> {
    const resume = await this.resumeService.findOneById(params.resumeId, { join: true })

    return { ...this.resumeService.toPersianDate(resume) }
  }
}
