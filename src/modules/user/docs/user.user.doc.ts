import { applyDecorators } from '@nestjs/common'
import { FileSingleDto } from 'src/common/file/dtos/file.single.dto'
import { UserProfileSerialization } from '../serializations/user.profile.serialization'
import { Doc, DocAuth, DocGuard, DocRequestFile, DocResponse } from 'src/common/doc/decorators/doc.decorator'

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

export function UserUserPromptDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'prompt a question to the user',
    }),

    DocAuth({ jwtAccessToken: true }),
    DocGuard({ role: true }),
    DocResponse<UserProfileSerialization>('user.prompt', {
      serialization: UserProfileSerialization,
    })
  )
}

export function UserUploadProfileDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'update profile photo',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocRequestFile({ body: FileSingleDto }),
    DocResponse('user.upload')
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
