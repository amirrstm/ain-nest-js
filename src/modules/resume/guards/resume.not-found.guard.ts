import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ResumeDoc } from '../repository/entities/resume.entity'
import { ENUM_RESUME_STATUS_CODE_ERROR } from '../constants/resume.status-code.constant'

@Injectable()
export class ResumeNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __resume } = context.switchToHttp().getRequest<IRequestApp & { __resume: ResumeDoc }>()

    if (!__resume) {
      throw new NotFoundException({
        statusCode: ENUM_RESUME_STATUS_CODE_ERROR.RESUME_EXIST_ERROR,
        message: 'resume.error.notFound',
      })
    }

    return true
  }
}
