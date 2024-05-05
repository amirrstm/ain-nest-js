import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from 'src/common/auth/services/auth.service'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant'
import { AuthLinkedinPayloadSerialization } from '../../serializations/auth.linkedin-payload.serialization'

@Injectable()
export class AuthLinkedinOauth2Guard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp<AuthLinkedinPayloadSerialization>>()

    const {
      user: { accessToken },
    } = request?.user

    if (!accessToken) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_LINKEDIN_SSO_ERROR,
        message: 'auth.error.linkedinSSO',
      })
    }

    try {
      request.user = { user: { accessToken } }

      return true
    } catch (err: any) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_LINKEDIN_SSO_ERROR,
        message: 'auth.error.linkedinSSO',
      })
    }
  }
}
