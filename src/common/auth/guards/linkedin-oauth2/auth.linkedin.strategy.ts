import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-linkedin-oauth2'

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly configService: ConfigService) {
    super({
      scope: ['openid', 'profile', 'email', 'r_basicprofile', 'r_organization_social'],
      clientID: configService.get<string>('linkedin.clientId'),
      callbackURL: configService.get<string>('linkedin.callbackUrl'),
      clientSecret: configService.get<string>('linkedin.clientSecret'),
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void
  ): Promise<any> {
    const user = {
      profile,
      accessToken,
      refreshToken,
    }

    done(null, { user })
  }
}
