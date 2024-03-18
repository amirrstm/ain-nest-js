import { applyDecorators } from '@nestjs/common'
import { Doc, DocAuth, DocGuard, DocResponsePaging } from 'src/common/doc/decorators/doc.decorator'

import { ResumeGetSerialization } from '../serializations/resume.get.serialization'

export function ResumeAdminListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Get All Of Resumes',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true, policy: true }),
    DocResponsePaging<ResumeGetSerialization>('resume.get', { serialization: ResumeGetSerialization })
  )
}
