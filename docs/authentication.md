# Authentication

This document explains how authentication works in the AIN-NestJS application, including JWT tokens, OAuth2 providers, and authentication flows.

## Prerequisites

- NestJS application with Passport.js integration
- Understanding of JWT (JSON Web Tokens)
- Knowledge of OAuth2 authentication flows
- Basic understanding of security concepts

## Purpose

The authentication system provides:

- **JWT-based authentication** with access and refresh tokens
- **OAuth2 integration** with Google and LinkedIn
- **Password-based authentication** with security features
- **Token encryption** for enhanced security
- **Multi-factor authentication** support
- **Session management** and token refresh

## Description

The application uses a comprehensive authentication system built on Passport.js with JWT tokens. It supports multiple authentication methods:

- **Email/Password Authentication** - Traditional login with credentials
- **Google OAuth2** - Social login with Google accounts
- **LinkedIn OAuth2** - Social login with LinkedIn accounts
- **Mobile Number Authentication** - OTP-based mobile verification

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │    │   Passport       │    │   Auth          │
│   Request       │───▶│   Strategies     │───▶│   Service       │
│                 │    │   & Guards       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   JWT Tokens     │    │   User          │
                       │   (Access/Refresh)│    │   Validation    │
                       └──────────────────┘    └─────────────────┘
```

## Configuration

### 1. Authentication Configuration (`src/configs/auth.config.ts`)

```typescript
export default registerAs(
  'auth',
  (): Record<string, any> => ({
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY ?? '123456',
      expirationTime: seconds(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED ?? '1h'), // 1 hour
      encryptKey: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV,
    },
    refreshToken: {
      secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY ?? '123456000',
      expirationTime: seconds(process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED ?? '182d'), // 182 days
      encryptKey: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV,
    },
    subject: process.env.AUTH_JWT_SUBJECT ?? 'ainDevelopment',
    audience: process.env.AUTH_JWT_AUDIENCE ?? 'https://example.com',
    issuer: process.env.AUTH_JWT_ISSUER ?? 'ain',
    prefixAuthorization: 'Bearer',
    payloadEncryption: process.env.AUTH_JWT_PAYLOAD_ENCRYPT === 'true' ? true : false,
    password: {
      attempt: false,
      maxAttempt: 5,
      saltLength: 8,
      expiredIn: seconds('182d'), // 182 days
    },
  })
)
```

### 2. Authentication Enums (`src/common/auth/constants/auth.enum.constant.ts`)

```typescript
export enum ENUM_AUTH_LOGIN_WITH {
  EMAIL = 'EMAIL',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
}

export enum ENUM_AUTH_LOGIN_FROM {
  PASSWORD = 'PASSWORD',
  GOOGLE = 'GOOGLE',
  WHATSAPP = 'WHATSAPP',
}
```

## JWT Authentication

### 1. Access Token Strategy

```typescript
@Injectable()
export class AuthJwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(configService.get<string>('auth.prefixAuthorization')),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        ignoreNotBefore: true,
        audience: configService.get<string>('auth.audience'),
        issuer: configService.get<string>('auth.issuer'),
        subject: configService.get<string>('auth.subject'),
      },
      secretOrKey: configService.get<string>('auth.accessToken.secretKey'),
    })
  }

  async validate({ data }: Record<string, any>): Promise<Record<string, any>> {
    const payloadEncryption: boolean = await this.authService.getPayloadEncryption()
    return payloadEncryption ? this.authService.decryptAccessToken({ data }) : data
  }
}
```

### 2. JWT Access Guard

```typescript
@Injectable()
export class AuthJwtAccessGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
        message: 'auth.error.accessTokenUnauthorized',
        _error: err ? err.message : info.message,
      })
    }
    return user
  }
}
```

### 3. JWT Payload Structure

```typescript
export class AuthAccessPayloadSerialization {
  readonly user: Record<string, any>      // User information
  readonly loginDate: Date               // Login timestamp
  readonly loginWith: ENUM_AUTH_LOGIN_WITH // Login method (EMAIL/MOBILE_NUMBER)
  readonly loginFrom: ENUM_AUTH_LOGIN_FROM // Login source (PASSWORD/GOOGLE/WHATSAPP)
}
```

## Authentication Decorators

### 1. JWT Protection Decorators

```typescript
// Basic JWT access protection
export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtAccessGuard))
}

// User role protection
export function AuthJwtUserAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.USER])
  )
}

// Admin role protection
export function AuthJwtAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN])
  )
}

// Refresh token protection
export function AuthJwtRefreshProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtRefreshGuard))
}
```

### 2. Parameter Decorators

```typescript
// Extract JWT payload from request
export const AuthJwtPayload = createParamDecorator(<T>(data: string, ctx: ExecutionContext): T => {
  const { user } = ctx.switchToHttp().getRequest<IRequestApp & { user: T }>()
  return data ? user[data] : user
})

// Extract JWT token from Authorization header
export const AuthJwtToken = createParamDecorator((data: string, ctx: ExecutionContext): string => {
  const { headers } = ctx.switchToHttp().getRequest<IRequestApp>()
  const { authorization } = headers
  const authorizations: string[] = authorization.split(' ')
  return authorizations.length >= 2 ? authorizations[1] : undefined
})
```

## OAuth2 Integration

### 1. Google OAuth2 Strategy

```typescript
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      scope: ['profile', 'email'],
      clientID: configService.get<string>('google.clientId'),
      callbackURL: configService.get<string>('google.callbackUrl'),
      clientSecret: configService.get<string>('google.clientSecret'),
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      accessToken,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    }
    done(null, { user })
  }
}
```

### 2. Google OAuth2 Guard

```typescript
@Injectable()
export class AuthGoogleOauth2Guard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const isAuth: boolean = request.isAuthenticated()
    
    if (!isAuth) {
      const passport = request.session.passport
      const user: AuthGooglePayloadSerialization = passport?.user?.user
      
      if (!user) {
        throw new UnauthorizedException({
          statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_GOOGLE_SSO_ERROR,
          message: 'auth.error.googleSSO',
        })
      }
      
      request.__user = user
    }
    
    return true
  }
}
```

## Authentication Service

### 1. Core Authentication Methods

```typescript
export interface IAuthService {
  // Token Management
  encryptAccessToken(payload: Record<string, any>): Promise<string>
  decryptAccessToken(payload: Record<string, any>): Promise<Record<string, any>>
  createAccessToken(payloadHashed: string | Record<string, any>): Promise<string>
  validateAccessToken(token: string): Promise<boolean>
  payloadAccessToken(token: string): Promise<Record<string, any>>
  
  // Refresh Token Management
  encryptRefreshToken(payload: Record<string, any>): Promise<string>
  decryptRefreshToken(payload: Record<string, any>): Promise<Record<string, any>>
  createRefreshToken(payloadHashed: string | Record<string, any>): Promise<string>
  validateRefreshToken(token: string): Promise<boolean>
  payloadRefreshToken(token: string): Promise<Record<string, any>>
  
  // Password Management
  validateUser(passwordString: string, passwordHash: string): Promise<boolean>
  createPassword(password: string): Promise<IAuthPassword>
  createPasswordRandom(): Promise<string>
  checkPasswordExpired(passwordExpired: Date): Promise<boolean>
  
  // Payload Creation
  createPayloadAccessToken(
    user: Record<string, any>,
    { loginFrom, loginWith, loginDate }: IAuthPayloadOptions
  ): Promise<AuthAccessPayloadSerialization>
  createPayloadRefreshToken(
    _id: string,
    { loginFrom, loginWith, loginDate }: AuthAccessPayloadSerialization
  ): Promise<AuthRefreshPayloadSerialization>
}
```

## How to Use

### 1. Email/Password Authentication

```typescript
@Controller('/user')
export class UserAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  async login(@Body() { email, password }: UserLoginDto): Promise<IResponse> {
    const user: UserDoc = await this.userService.findOneByEmail(email)
    if (!user) {
      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
        message: 'user.error.notFound',
      })
    }

    // Validate password
    const validate: boolean = await this.authService.validateUser(password, user.password)
    if (!validate) {
      throw new BadRequestException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
        message: 'user.error.passwordNotMatch',
      })
    }

    // Check user status
    if (user.blocked || !user.isActive) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
        message: 'user.error.blocked',
      })
    }

    // Create tokens
    const payloadAccessToken: AuthAccessPayloadSerialization = await this.authService.createPayloadAccessToken(
      user,
      {
        loginFrom: ENUM_AUTH_LOGIN_FROM.PASSWORD,
        loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
        loginDate: await this.authService.getLoginDate(),
      }
    )

    const payloadRefreshToken: AuthRefreshPayloadSerialization = await this.authService.createPayloadRefreshToken(
      user._id,
      payloadAccessToken
    )

    const accessToken: string = await this.authService.createAccessToken(payloadAccessToken)
    const refreshToken: string = await this.authService.createRefreshToken(payloadRefreshToken)

    return {
      data: {
        user: user,
        accessToken,
        refreshToken,
      },
      message: 'user.login',
    }
  }
}
```

### 2. Google OAuth2 Authentication

```typescript
@Controller('/user')
export class UserAuthController {
  @Get('/login/google')
  @AuthGoogleOAuth2Protected()
  async loginGoogle(): Promise<void> {
    // Passport handles the OAuth2 flow
  }

  @Get('/login/google/callback')
  @AuthGoogleOAuth2Protected()
  async loginGoogleCallback(@AuthGooglePayload() googlePayload: AuthGooglePayloadSerialization): Promise<IResponse> {
    const user = await this.userService.findOneByEmail(googlePayload.email)
    
    if (user) {
      // Existing user login
      const payloadAccessToken = await this.authService.createPayloadAccessToken(user, {
        loginFrom: ENUM_AUTH_LOGIN_FROM.GOOGLE,
        loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
        loginDate: await this.authService.getLoginDate(),
      })

      const accessToken = await this.authService.createAccessToken(payloadAccessToken)
      const refreshToken = await this.authService.createRefreshToken(
        await this.authService.createPayloadRefreshToken(user._id, payloadAccessToken)
      )

      return {
        data: {
          user,
          accessToken,
          refreshToken,
        },
        message: 'user.loginGoogle',
      }
    } else {
      // Create new user from Google data
      const role = await this.roleService.findOneByName('user')
      const newUser = await this.userService.create({
        email: googlePayload.email,
        firstName: googlePayload.firstName,
        lastName: googlePayload.lastName,
        picture: googlePayload.picture,
        role: role._id,
        signUpFrom: ENUM_USER_SIGN_UP_FROM.GOOGLE,
      })

      // Generate tokens for new user
      // ... token generation logic
    }
  }
}
```

### 3. Token Refresh

```typescript
@Post('/refresh')
@AuthJwtRefreshProtected()
async refresh(@AuthJwtPayload() payload: AuthRefreshPayloadSerialization): Promise<IResponse> {
  const user = await this.userService.findOneById(payload.user._id)
  if (!user) {
    throw new NotFoundException({
      statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
      message: 'user.error.notFound',
    })
  }

  const payloadAccessToken: AuthAccessPayloadSerialization = await this.authService.createPayloadAccessToken(
    user,
    {
      loginFrom: payload.loginFrom,
      loginWith: payload.loginWith,
      loginDate: payload.loginDate,
    }
  )

  const accessToken: string = await this.authService.createAccessToken(payloadAccessToken)

  return {
    data: {
      user,
      accessToken,
    },
    message: 'user.refresh',
  }
}
```

### 4. Protected Route Usage

```typescript
@Controller('/user')
export class UserController {
  @Get('/profile')
  @AuthJwtUserAccessProtected()  // Requires USER role
  async getProfile(@AuthJwtPayload() payload: AuthAccessPayloadSerialization): Promise<IResponse> {
    const user = await this.userService.findOneById(payload.user._id)
    return {
      data: user,
      message: 'user.profile',
    }
  }

  @Get('/admin/users')
  @AuthJwtAdminAccessProtected()  // Requires ADMIN or SUPER_ADMIN role
  async getUsers(): Promise<IResponse> {
    const users = await this.userService.findAll()
    return {
      data: users,
      message: 'user.list',
    }
  }
}
```

### 5. Client-Side Usage

```javascript
// Login with email/password
const loginResponse = await fetch('/api/v1/user/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})

const { data } = await loginResponse.json()
const { accessToken, refreshToken } = data

// Use access token for authenticated requests
const profileResponse = await fetch('/api/v1/user/profile', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
})

// Refresh token when access token expires
const refreshResponse = await fetch('/api/v1/user/refresh', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${refreshToken}`,
    'Content-Type': 'application/json',
  }
})
```

## Params and Options

### Authentication Options

```typescript
export interface IAuthPassword {
  readonly passwordHash: string
  readonly salt: string
}

export interface IAuthPayloadOptions {
  readonly loginFrom: ENUM_AUTH_LOGIN_FROM
  readonly loginWith: ENUM_AUTH_LOGIN_WITH
  readonly loginDate: Date
}
```

### Environment Variables

```bash
# JWT Configuration
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY=your_access_token_secret
AUTH_JWT_ACCESS_TOKEN_EXPIRED=1h
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret
AUTH_JWT_REFRESH_TOKEN_EXPIRED=182d

# JWT Payload Encryption (Optional)
AUTH_JWT_PAYLOAD_ENCRYPT=true
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY=your_encrypt_key
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV=your_encrypt_iv

# JWT Claims
AUTH_JWT_SUBJECT=ainDevelopment
AUTH_JWT_AUDIENCE=https://example.com
AUTH_JWT_ISSUER=ain

# OAuth2 Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/user/login/google/callback

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/v1/user/login/linkedin/callback
```

## Security Features

### 1. Password Security

- **Salt Generation**: Each password is salted with a random 8-character salt
- **Password Hashing**: Passwords are hashed using bcrypt
- **Password Expiration**: Configurable password expiration (default: 182 days)
- **Attempt Limiting**: Optional password attempt limiting with lockout

### 2. Token Security

- **JWT Signing**: Tokens are signed with secret keys
- **Payload Encryption**: Optional encryption of JWT payloads
- **Token Expiration**: Access tokens expire in 1 hour, refresh tokens in 182 days
- **Token Validation**: Comprehensive token validation with audience, issuer, and subject checks

### 3. OAuth2 Security

- **State Parameter**: CSRF protection using state parameters
- **Scope Limitation**: Limited OAuth2 scopes (profile, email)
- **Profile Validation**: Validation of OAuth2 profile data

## Best Practices

### 1. Token Management

```typescript
// Always validate tokens before use
const isValid = await this.authService.validateAccessToken(token)
if (!isValid) {
  throw new UnauthorizedException('Invalid token')
}

// Use refresh tokens to get new access tokens
const newAccessToken = await this.authService.createAccessToken(payload)
```

### 2. Error Handling

```typescript
// Provide meaningful error messages
if (!user) {
  throw new NotFoundException({
    statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
    message: 'user.error.notFound',
  })
}
```

### 3. Security Headers

```typescript
// Always use HTTPS in production
// Set secure cookie flags
// Implement rate limiting
// Use CORS properly
```

## Scenario

### Complete Authentication Flow

1. **User Registration**: User signs up with email/password or OAuth2
2. **Login Process**: User authenticates and receives JWT tokens
3. **Token Usage**: Client uses access token for API requests
4. **Token Refresh**: When access token expires, use refresh token
5. **Logout**: Invalidate tokens and clear session

```typescript
// Complete login flow
async login(@Body() loginDto: UserLoginDto): Promise<IResponse> {
  // 1. Validate credentials
  const user = await this.validateCredentials(loginDto.email, loginDto.password)
  
  // 2. Check user status
  await this.validateUserStatus(user)
  
  // 3. Create JWT payload
  const payload = await this.authService.createPayloadAccessToken(user, {
    loginFrom: ENUM_AUTH_LOGIN_FROM.PASSWORD,
    loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
    loginDate: await this.authService.getLoginDate(),
  })
  
  // 4. Generate tokens
  const accessToken = await this.authService.createAccessToken(payload)
  const refreshToken = await this.authService.createRefreshToken(
    await this.authService.createPayloadRefreshToken(user._id, payload)
  )
  
  // 5. Return response
  return {
    data: { user, accessToken, refreshToken },
    message: 'user.login',
  }
}
```

This authentication system provides a robust, secure, and flexible foundation for user authentication with support for multiple authentication methods and comprehensive security features.
