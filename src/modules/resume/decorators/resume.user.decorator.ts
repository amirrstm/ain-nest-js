import { applyDecorators, UseGuards } from '@nestjs/common'

import { ResumeNotFoundGuard } from '../guards/resume.not-found.guard'
import { ResumePutToRequestGuard } from '../guards/resume.put-to-request.guard'

export function ResumeUserGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ResumePutToRequestGuard, ResumeNotFoundGuard))
}
