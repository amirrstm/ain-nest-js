import { applyDecorators } from '@nestjs/common'
import { Doc, DocAuth, DocGuard, DocResponse } from 'src/common/doc/decorators/doc.decorator'
import { UserProfileSerialization } from '../serializations/user.profile.serialization'

export function UserUserUpdateNameDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update name of a user',
    }),

    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true }),
    DocResponse<UserProfileSerialization>('user.update', {
      serialization: UserProfileSerialization,
    })
  )
}

export function UserUserDeleteSelfDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'user delete their account',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocGuard({ role: true }),
    DocResponse('user.deleteSelf')
  )
}
