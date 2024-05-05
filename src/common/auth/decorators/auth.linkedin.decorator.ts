import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthLinkedinOauth2Guard } from '../guards/linkedin-oauth2/auth.linkedin-oauth2.guard'

export function AuthLinkedinOAuth2Protected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard('linkedin'), AuthLinkedinOauth2Guard))
}
