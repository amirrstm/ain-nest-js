import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Response } from '@nestjs/common'

import { ResumeService } from '../services/resume.service'
import { HelperDateService } from 'src/common/helper/services/helper.date.service'

@ApiTags('Modules.Public.Resume')
@Controller({ version: '1', path: '/resume' })
export class ResumePublicController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly helperDateService: HelperDateService
  ) {}

  @Get('/:resumeId')
  async overview(@Param() params: Record<string, string>, @Response() res: any): Promise<any> {
    const resume = await this.resumeService.findOneById(params.resumeId, { join: true })

    res.setHeader(
      'Content-Security-Policy',
      'frame-ancestors https://*.ainevis.com http://*.ainevis.com http://localhost:3000'
    )

    res.render('templates/pdf/vision', { ...this.resumeService.toPersianDate(resume) })

    return { ...this.resumeService.toPersianDate(resume) }
  }
}
