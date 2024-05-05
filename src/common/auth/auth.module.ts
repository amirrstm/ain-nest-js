import { DynamicModule, Module } from '@nestjs/common'
import { AuthJwtAccessStrategy } from 'src/common/auth/guards/jwt-access/auth.jwt-access.strategy'
import { AuthJwtRefreshStrategy } from 'src/common/auth/guards/jwt-refresh/auth.jwt-refresh.strategy'
import { AuthService } from 'src/common/auth/services/auth.service'
import { GoogleStrategy } from './guards/google-oauth2/auth.google.strategy'
import { LinkedinStrategy } from './guards/linkedin-oauth2/auth.linkedin.strategy'

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [],
  imports: [],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [AuthJwtAccessStrategy, AuthJwtRefreshStrategy, GoogleStrategy, LinkedinStrategy],
      exports: [],
      controllers: [],
      imports: [],
    }
  }
}
