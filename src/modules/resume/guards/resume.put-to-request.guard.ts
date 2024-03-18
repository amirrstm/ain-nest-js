import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ResumeService } from '../services/resume.service'
import { ResumeDoc } from '../repository/entities/resume.entity'

@Injectable()
export class ResumePutToRequestGuard implements CanActivate {
  constructor(private readonly resumeService: ResumeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __resume: ResumeDoc }>()
    const { params } = request
    const { resume } = params

    const check: ResumeDoc = await this.resumeService.findOneById(resume)
    request.__resume = check

    return true
  }
}
