import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from 'src/common/auth/services/auth.service'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'
import { IHelperGooglePayload } from 'src/common/helper/interfaces/helper.interface'
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/common/auth/constants/auth.status-code.constant'
import { AuthGooglePayloadSerialization } from 'src/common/auth/serializations/auth.google-payload.serialization'

@Injectable()
export class AuthGoogleOauth2Guard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp<AuthGooglePayloadSerialization>>()

    const {
      user: { accessToken, firstName, lastName, picture },
    } = request?.user

    if (!accessToken) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_GOOGLE_SSO_ERROR,
        message: 'auth.error.googleSSO',
      })
    }

    try {
      const payload: IHelperGooglePayload = await this.authService.googleGetTokenInfo(accessToken)

      request.user = {
        user: {
          picture,
          firstName,
          lastName,
          accessToken,
          email: payload.email,
        },
      }

      return true
    } catch (err: any) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_GOOGLE_SSO_ERROR,
        message: 'auth.error.googleSSO',
      })
    }
  }
}
