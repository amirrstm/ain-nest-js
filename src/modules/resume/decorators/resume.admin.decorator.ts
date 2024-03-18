import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { ResumeDoc } from '../repository/entities/resume.entity'
import { ResumeNotFoundGuard } from '../guards/resume.not-found.guard'
import { ResumePutToRequestGuard } from '../guards/resume.put-to-request.guard'

export function ResumeAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(ResumePutToRequestGuard, ResumeNotFoundGuard))
}

export const GetResume = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __resume } = ctx.switchToHttp().getRequest<IRequestApp & { __resume: ResumeDoc }>()
  return (returnPlain ? __resume.toObject() : __resume) as T
})
