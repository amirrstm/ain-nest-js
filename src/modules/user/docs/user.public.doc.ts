import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant'
import { Doc, DocRequest, DocResponse } from 'src/common/doc/decorators/doc.decorator'
import { UserSignUpDto } from 'src/modules/user/dtos/user.sign-up.dto'
import { UserSignUpMobileDto } from '../dtos/user.signup-mobile.dto'

export function UserPublicSignUpDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'sign up a user',
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      body: UserSignUpDto,
    }),
    DocResponse('user.signUp', {
      httpStatus: HttpStatus.CREATED,
    })
  )
}

export function UserPublicSignUpMobileDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'sign up a user with mobile',
    }),
    DocRequest({
      body: UserSignUpMobileDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocResponse('user.signUp', {
      httpStatus: HttpStatus.CREATED,
    })
  )
}
