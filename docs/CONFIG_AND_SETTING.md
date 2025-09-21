# Configuration & Settings

This document explains how configuration and settings management works in the AIN-NestJS application, including environment variables, configuration modules, and dynamic settings.

## Prerequisites

- Understanding of NestJS configuration management
- Knowledge of environment variables and `.env` files
- Basic understanding of MongoDB for settings storage
- Familiarity with TypeScript configuration patterns

---

# Configuration

## Purpose

The configuration system provides:

- **Environment-based configuration** with fallback values
- **Modular configuration structure** for different services
- **Type-safe configuration access** with TypeScript
- **Centralized configuration management** across the application
- **Environment variable validation** and default values

## Description

The application uses NestJS's built-in configuration system with modular configuration files. Each configuration module handles specific aspects of the application:

- **App Configuration** - Core application settings
- **Database Configuration** - MongoDB connection settings
- **Authentication Configuration** - JWT and OAuth2 settings
- **External Service Configuration** - Third-party service integrations
- **Feature Configuration** - Feature-specific settings

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Environment   │    │   Configuration  │    │   Application   │
│   Variables     │───▶│   Modules        │───▶│   Services      │
│   (.env files)  │    │   (registerAs)   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Config         │    │   Runtime       │
                       │   Validation     │    │   Access        │
                       └──────────────────┘    └─────────────────┘
```

## Configuration Structure

### 1. Configuration Index (`src/configs/index.ts`)

```typescript
import AppConfig from './app.config'
import AuthConfig from './auth.config'
import DatabaseConfig from './database.config'
import DebuggerConfig from './debugger.config'
import DocConfig from './doc.config'
import EmailConfig from './email.config'
import GoogleConfig from './google.config'
import HelperConfig from './helper.config'
import MessageConfig from './message.config'
import RequestConfig from './request.config'
import UserConfig from './user.config'
import AIConfig from './open-ai.config'
import SmsConfig from './sms.config'
import AwsConfig from './aws.config'
import LinkedinConfig from './linkedin.config'

export default [
  AwsConfig,
  AIConfig,
  AppConfig,
  AuthConfig,
  DatabaseConfig,
  HelperConfig,
  UserConfig,
  RequestConfig,
  DocConfig,
  SmsConfig,
  DebuggerConfig,
  MessageConfig,
  GoogleConfig,
  EmailConfig,
  LinkedinConfig,
]
```

### 2. App Configuration (`src/configs/app.config.ts`)

```typescript
import { version } from 'package.json'
import { APP_TZ } from 'src/app/constants/app.constant'
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'app',
  (): Record<string, any> => ({
    maintenance: process.env.APP_MAINTENANCE === 'true' ?? false,
    frontEndUrl: process.env.APP_FRONT_END_URL ?? 'http://localhost:3000',
    
    name: process.env.APP_NAME ?? 'ain',
    env: process.env.APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT,
    
    tz: process.env.APP_TZ ?? APP_TZ,
    
    repoVersion: version,
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === 'true' ?? false,
      prefix: 'v',
      version: process.env.HTTP_VERSION ?? '1',
    },
    
    globalPrefix: '/api',
    http: {
      enable: process.env.HTTP_ENABLE === 'true' ?? false,
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT ? Number.parseInt(process.env.HTTP_PORT) : 3000,
    },
    
    jobEnable: process.env.JOB_ENABLE === 'true' ?? false,
  })
)
```

### 3. Database Configuration (`src/configs/database.config.ts`)

```typescript
import { registerAs } from '@nestjs/config'

export default registerAs(
  'database',
  (): Record<string, any> => ({
    host: process.env?.DATABASE_HOST ?? 'mongodb://localhost:27017,localhost:27018,localhost:27019',
    name: process.env?.DATABASE_NAME ?? 'ain-db',
    user: process.env?.DATABASE_USER,
    password: process?.env.DATABASE_PASSWORD,
    debug: process.env.DATABASE_DEBUG === 'true',
    options: process.env?.DATABASE_OPTIONS,
    timeoutOptions: {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      heartbeatFrequencyMS: 30000,
    },
  })
)
```

### 4. Authentication Configuration (`src/configs/auth.config.ts`)

```typescript
import { seconds } from 'src/common/helper/constants/helper.function.constant'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY ?? '123456',
      expirationTime: seconds(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED ?? '1h'),
      encryptKey: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV,
    },
    refreshToken: {
      secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY ?? '123456000',
      expirationTime: seconds(process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED ?? '182d'),
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
      expiredIn: seconds('182d'),
    },
  })
)
```

## Configuration Loading

### 1. Main Application Bootstrap (`src/main.ts`)

```typescript
import { ConfigService } from '@nestjs/config'
import { AppModule } from 'src/app/app.module'

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  
  // Access configuration values
  const databaseUri: string = configService.get<string>('database.host')
  const env: string = configService.get<string>('app.env')
  const tz: string = configService.get<string>('app.tz')
  const host: string = configService.get<string>('app.http.host')
  const port: number = configService.get<number>('app.http.port')
  const globalPrefix: string = configService.get<string>('app.globalPrefix')
  
  // Set environment variables
  process.env.NODE_ENV = env
  process.env.TZ = tz
  
  // Configure application
  app.setGlobalPrefix(globalPrefix)
  app.enableCors()
  await app.listen(port, host)
}
```

### 2. Service Configuration Access

```typescript
@Injectable()
export class AppController {
  private readonly serviceName: string

  constructor(
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService
  ) {
    this.serviceName = this.configService.get<string>('app.name')
  }

  @Get('/hello')
  async hello(): Promise<any> {
    return {
      serviceName: this.serviceName,
      environment: this.configService.get<string>('app.env'),
      version: this.configService.get<string>('app.repoVersion'),
    }
  }
}
```

## Environment Variables

### 1. Required Environment Variables

```bash
# Application
APP_NAME=ain
APP_ENV=development
APP_TZ=Asia/Tehran
APP_MAINTENANCE=false
APP_FRONT_END_URL=http://localhost:3000

# HTTP Server
HTTP_ENABLE=true
HTTP_HOST=localhost
HTTP_PORT=3000
HTTP_VERSIONING_ENABLE=true
HTTP_VERSION=1

# Database
DATABASE_HOST=mongodb://localhost:27017,localhost:27018,localhost:27019
DATABASE_NAME=ain-db
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_DEBUG=false
DATABASE_OPTIONS=retryWrites=true&w=majority

# Authentication
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY=your_access_token_secret
AUTH_JWT_ACCESS_TOKEN_EXPIRED=1h
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret
AUTH_JWT_REFRESH_TOKEN_EXPIRED=182d
AUTH_JWT_SUBJECT=ainDevelopment
AUTH_JWT_AUDIENCE=https://example.com
AUTH_JWT_ISSUER=ain

# JWT Payload Encryption (Optional)
AUTH_JWT_PAYLOAD_ENCRYPT=false
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY=your_encrypt_key
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV=your_encrypt_iv

# OpenAI
OPEN_AI_SECRET_KEY=your_openai_api_key

# Google OAuth2
SSO_GOOGLE_CLIENT_ID=your_google_client_id
SSO_GOOGLE_CLIENT_SECRET=your_google_client_secret
SSO_GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/user/login/google/callback

# LinkedIn OAuth2
SSO_LINKEDIN_CLIENT_ID=your_linkedin_client_id
SSO_LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
SSO_LINKEDIN_CALLBACK_URL=http://localhost:3000/api/v1/user/login/linkedin/callback

# AWS S3
AWS_S3_CREDENTIAL_KEY=your_aws_access_key
AWS_S3_CREDENTIAL_SECRET=your_aws_secret_key
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name
AWS_S3_ENDPOINT=https://s3.amazonaws.com

# SMS Service
SMS_SERVICE_URL=your_sms_service_url
SMS_SERVICE_API_KEY=your_sms_api_key

# Email Service
EMAIL_FROM=noreply@mail.com

# Jobs
JOB_ENABLE=true
```

### 2. Environment-Specific Configuration

```bash
# .env.development
APP_ENV=development
DATABASE_HOST=mongodb://localhost:27017
APP_MAINTENANCE=false

# .env.staging
APP_ENV=staging
DATABASE_HOST=mongodb://staging-cluster:27017
APP_MAINTENANCE=false

# .env.production
APP_ENV=production
DATABASE_HOST=mongodb://production-cluster:27017
APP_MAINTENANCE=false
```

## How to Use

### 1. Creating New Configuration

```typescript
// src/configs/new-service.config.ts
import { registerAs } from '@nestjs/config'

export default registerAs(
  'newService',
  (): Record<string, any> => ({
    apiKey: process.env.NEW_SERVICE_API_KEY,
    baseUrl: process.env.NEW_SERVICE_BASE_URL ?? 'https://api.example.com',
    timeout: process.env.NEW_SERVICE_TIMEOUT ? Number.parseInt(process.env.NEW_SERVICE_TIMEOUT) : 5000,
    retries: process.env.NEW_SERVICE_RETRIES ? Number.parseInt(process.env.NEW_SERVICE_RETRIES) : 3,
  })
)
```

### 2. Adding to Configuration Index

```typescript
// src/configs/index.ts
import NewServiceConfig from './new-service.config'

export default [
  // ... existing configs
  NewServiceConfig,
]
```

### 3. Using Configuration in Services

```typescript
@Injectable()
export class NewService {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('newService.apiKey')
    this.baseUrl = this.configService.get<string>('newService.baseUrl')
  }

  async makeRequest(): Promise<any> {
    // Use configuration values
    const response = await fetch(`${this.baseUrl}/api`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    })
    return response.json()
  }
}
```

### 4. Configuration Validation

```typescript
import { IsString, IsOptional, IsNumber } from 'class-validator'

export class NewServiceConfigSchema {
  @IsString()
  apiKey: string

  @IsString()
  @IsOptional()
  baseUrl?: string

  @IsNumber()
  @IsOptional()
  timeout?: number
}

// Validate configuration
const config = configService.get<NewServiceConfigSchema>('newService')
const validationErrors = await validate(config)
if (validationErrors.length > 0) {
  throw new Error('Invalid configuration')
}
```

## Params and Options

### Configuration Options

```typescript
export interface IConfigOptions {
  readonly envFilePath?: string | string[]
  readonly isGlobal?: boolean
  readonly cache?: boolean
  readonly expandVariables?: boolean
}

export interface IConfigService {
  get<T = any>(propertyPath: string, defaultValue?: T): T
  getOrThrow<T = any>(propertyPath: string): T
}
```

### Environment Variable Types

```typescript
export enum ENUM_APP_ENVIRONMENT {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
}

export enum ENUM_SETTING_DATA_TYPE {
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  ARRAY_OF_STRING = 'ARRAY_OF_STRING',
  NUMBER = 'NUMBER',
}
```

## Best Practices

### 1. Configuration Organization

```typescript
// Group related configurations
export default registerAs(
  'service',
  (): Record<string, any> => ({
    // Connection settings
    host: process.env.SERVICE_HOST,
    port: process.env.SERVICE_PORT,
    
    // Authentication
    auth: {
      apiKey: process.env.SERVICE_API_KEY,
      secret: process.env.SERVICE_SECRET,
    },
    
    // Feature flags
    features: {
      enableFeatureA: process.env.SERVICE_FEATURE_A === 'true',
      enableFeatureB: process.env.SERVICE_FEATURE_B === 'true',
    },
  })
)
```

### 2. Default Values

```typescript
// Always provide sensible defaults
export default registerAs(
  'service',
  (): Record<string, any> => ({
    host: process.env.SERVICE_HOST ?? 'localhost',
    port: process.env.SERVICE_PORT ? Number.parseInt(process.env.SERVICE_PORT) : 3000,
    timeout: process.env.SERVICE_TIMEOUT ? Number.parseInt(process.env.SERVICE_TIMEOUT) : 5000,
  })
)
```

### 3. Type Safety

```typescript
// Use TypeScript interfaces for configuration
export interface IAppConfig {
  readonly name: string
  readonly env: ENUM_APP_ENVIRONMENT
  readonly maintenance: boolean
  readonly http: {
    readonly enable: boolean
    readonly host: string
    readonly port: number
  }
}

// Type-safe access
const appConfig = configService.get<IAppConfig>('app')
```

## Scenario

### Complete Configuration Setup

1. **Environment Setup**: Create `.env` files for different environments
2. **Configuration Creation**: Define configuration modules with validation
3. **Application Bootstrap**: Load and validate configurations on startup
4. **Service Integration**: Access configurations in services and controllers
5. **Runtime Updates**: Handle configuration changes without restart

```typescript
// Complete configuration flow
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  
  // Validate required configurations
  const requiredConfigs = ['database.host', 'auth.accessToken.secretKey']
  for (const config of requiredConfigs) {
    if (!configService.get(config)) {
      throw new Error(`Missing required configuration: ${config}`)
    }
  }
  
  // Configure application based on environment
  const env = configService.get<string>('app.env')
  if (env === 'production') {
    app.use(helmet())
    app.use(compression())
  }
  
  await app.listen(configService.get<number>('app.http.port'))
}
```

---

# Settings

## Purpose

The settings system provides:

- **Dynamic configuration management** at runtime
- **Database-stored settings** with type validation
- **Admin interface** for settings management
- **Public settings access** for client applications
- **Type-safe setting values** with automatic conversion

## Description

The application implements a dynamic settings system that allows runtime configuration changes without application restart. Settings are stored in MongoDB and can be managed through admin interfaces or API endpoints.

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Admin         │    │   Settings       │    │   Application   │
│   Interface     │───▶│   Service        │───▶│   Services      │
│                 │    │   & Database     │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Setting        │    │   Runtime       │
                       │   Validation     │    │   Access        │
                       └──────────────────┘    └─────────────────┘
```

## Settings Structure

### 1. Setting Entity (`src/modules/setting/repository/entities/setting.entity.ts`)

```typescript
@DatabaseEntity({ collection: SettingDatabaseName })
export class SettingEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    index: true,
    unique: true,
    trim: true,
    type: String,
  })
  name: string

  @Prop({
    required: false,
    type: String,
  })
  description?: string

  @Prop({
    required: false,
    type: String,
    enum: ENUM_SETTING_DATA_TYPE,
  })
  type: ENUM_SETTING_DATA_TYPE

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  value: string
}
```

### 2. Setting Data Types (`src/modules/setting/constants/setting.enum.constant.ts`)

```typescript
export enum ENUM_SETTING_DATA_TYPE {
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  ARRAY_OF_STRING = 'ARRAY_OF_STRING',
  NUMBER = 'NUMBER',
}
```

### 3. Setting Service Interface (`src/modules/setting/interfaces/setting.service.interface.ts`)

```typescript
export interface ISettingService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<SettingDoc>
  findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<SettingDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create({ name, description, type, value }: SettingCreateDto, options?: IDatabaseCreateOptions): Promise<SettingDoc>
  updateValue(
    repository: SettingDoc,
    { type, value }: SettingUpdateValueDto,
    options?: IDatabaseSaveOptions
  ): Promise<SettingDoc>
  delete(repository: SettingDoc, options?: IDatabaseSaveOptions): Promise<SettingDoc>
  getValue<T>(setting: SettingDoc): Promise<T>
  checkValue(value: string, type: ENUM_SETTING_DATA_TYPE): Promise<boolean>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  getTimezone(): Promise<string>
}
```

## Settings Management

### 1. Creating Settings

```typescript
@Controller('/admin/setting')
export class SettingAdminController {
  constructor(private readonly settingService: SettingService) {}

  @Post('/')
  @AuthJwtAdminAccessProtected()
  async create(@Body() body: SettingCreateDto): Promise<IResponse> {
    const setting = await this.settingService.create(body)
    return {
      data: setting,
      message: 'setting.create',
    }
  }
}

// Setting creation DTO
export class SettingCreateDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsOptional()
  readonly description?: string

  @IsString()
  @IsNotEmpty()
  readonly type: ENUM_SETTING_DATA_TYPE

  @IsNotEmpty()
  readonly value: string
}
```

### 2. Updating Settings

```typescript
@Put('/update/:setting')
@AuthJwtAdminAccessProtected()
async update(
  @GetSetting() setting: SettingDoc,
  @Body() body: SettingUpdateValueDto
): Promise<IResponse> {
  const check = await this.settingService.checkValue(body.value, body.type)
  if (!check) {
    throw new BadRequestException({
      statusCode: ENUM_SETTING_STATUS_CODE_ERROR.SETTING_VALUE_NOT_ALLOWED_ERROR,
      message: 'setting.error.valueNotAllowed',
    })
  }

  await this.settingService.updateValue(setting, body)

  return {
    data: { _id: setting._id },
  }
}
```

### 3. Getting Setting Values

```typescript
@Injectable()
export class SettingService {
  async getValue<T>(setting: SettingDoc): Promise<T> {
    if (setting.type === ENUM_SETTING_DATA_TYPE.BOOLEAN && 
        (setting.value === 'true' || setting.value === 'false')) {
      return (setting.value === 'true') as any
    } else if (setting.type === ENUM_SETTING_DATA_TYPE.NUMBER && 
               this.helperNumberService.check(setting.value)) {
      return this.helperNumberService.create(setting.value) as any
    } else if (setting.type === ENUM_SETTING_DATA_TYPE.ARRAY_OF_STRING) {
      return setting.value.split(',') as any
    }

    return setting.value as any
  }

  async checkValue(value: string, type: ENUM_SETTING_DATA_TYPE): Promise<boolean> {
    switch (type) {
      case ENUM_SETTING_DATA_TYPE.BOOLEAN:
        return value === 'true' || value === 'false'
      case ENUM_SETTING_DATA_TYPE.NUMBER:
        return this.helperNumberService.check(value)
      case ENUM_SETTING_DATA_TYPE.ARRAY_OF_STRING:
        return Array.isArray(value.split(','))
      case ENUM_SETTING_DATA_TYPE.STRING:
        return typeof value === 'string'
      default:
        return false
    }
  }
}
```

## Public Settings Access

### 1. Core Settings Endpoint

```typescript
@Controller('/setting')
export class SettingPublicController {
  constructor(
    private readonly settingService: SettingService,
    private readonly messageService: MessageService
  ) {}

  @Get('/core')
  async getCoreSettings(): Promise<IResponse> {
    const languages: string[] = this.messageService.getAvailableLanguages()
    const tz: string = await this.settingService.getTimezone()
    const timezoneOffset: string = await this.settingService.getTimezoneOffset()

    const timezone: SettingTimezoneSerialization = {
      timezone: tz,
      timezoneOffset: timezoneOffset,
    }

    const file: SettingFileSerialization = {
      sizeInBytes: FILE_SIZE_IN_BYTES,
      sizeMediumInBytes: FILE_SIZE_MEDIUM_IN_BYTES,
      sizeLargeInBytes: FILE_SIZE_LARGE_IN_BYTES,
    }

    return {
      data: {
        languages,
        file,
        timezone,
      },
    }
  }
}
```

### 2. Using Settings in Services

```typescript
@Injectable()
export class SomeService {
  constructor(private readonly settingService: SettingService) {}

  async getMaintenanceMode(): Promise<boolean> {
    const setting = await this.settingService.findOneByName('maintenance_mode')
    return this.settingService.getValue<boolean>(setting)
  }

  async getMaxFileSize(): Promise<number> {
    const setting = await this.settingService.findOneByName('max_file_size')
    return this.settingService.getValue<number>(setting)
  }

  async getAllowedFileTypes(): Promise<string[]> {
    const setting = await this.settingService.findOneByName('allowed_file_types')
    return this.settingService.getValue<string[]>(setting)
  }
}
```

## How to Use

### 1. Creating a New Setting

```typescript
// Create setting via API
const newSetting = await this.settingService.create({
  name: 'max_upload_size',
  description: 'Maximum file upload size in bytes',
  type: ENUM_SETTING_DATA_TYPE.NUMBER,
  value: '10485760', // 10MB
})

// Or via admin interface
POST /api/v1/admin/setting
{
  "name": "max_upload_size",
  "description": "Maximum file upload size in bytes",
  "type": "NUMBER",
  "value": "10485760"
}
```

### 2. Updating Setting Values

```typescript
// Update setting value
PUT /api/v1/admin/setting/update/max_upload_size
{
  "type": "NUMBER",
  "value": "20971520" // 20MB
}
```

### 3. Accessing Settings in Code

```typescript
@Injectable()
export class FileService {
  constructor(private readonly settingService: SettingService) {}

  async uploadFile(file: Express.Multer.File): Promise<void> {
    // Get max upload size setting
    const maxSizeSetting = await this.settingService.findOneByName('max_upload_size')
    const maxSize = this.settingService.getValue<number>(maxSizeSetting)

    if (file.size > maxSize) {
      throw new BadRequestException('File too large')
    }

    // Get allowed file types
    const allowedTypesSetting = await this.settingService.findOneByName('allowed_file_types')
    const allowedTypes = this.settingService.getValue<string[]>(allowedTypesSetting)

    const fileExtension = file.originalname.split('.').pop()
    if (!allowedTypes.includes(fileExtension)) {
      throw new BadRequestException('File type not allowed')
    }

    // Process file upload
  }
}
```

### 4. Setting Decorators

```typescript
// Get setting by name decorator
export const GetSetting = createParamDecorator(
  (allowEmpty: boolean, ctx: ExecutionContext): SettingDoc => {
    const { __setting } = ctx.switchToHttp().getRequest<IRequestApp & { __setting: SettingDoc }>()
    
    if (!allowEmpty && !__setting) {
      throw new NotFoundException({
        statusCode: ENUM_SETTING_STATUS_CODE_ERROR.SETTING_NOT_FOUND_ERROR,
        message: 'setting.error.notFound',
      })
    }
    
    return __setting
  }
)

// Usage in controller
@Get('/:setting')
@SettingAdminGetGuard()
async getSetting(@GetSetting() setting: SettingDoc): Promise<IResponse> {
  return {
    data: setting,
    message: 'setting.get',
  }
}
```

## Params and Options

### Setting Options

```typescript
export interface ISettingCreateDto {
  readonly name: string
  readonly description?: string
  readonly type: ENUM_SETTING_DATA_TYPE
  readonly value: string
}

export interface ISettingUpdateValueDto {
  readonly type: ENUM_SETTING_DATA_TYPE
  readonly value: string
}
```

### Setting Data Types

```typescript
export enum ENUM_SETTING_DATA_TYPE {
  BOOLEAN = 'BOOLEAN',           // true/false
  STRING = 'STRING',             // text values
  ARRAY_OF_STRING = 'ARRAY_OF_STRING', // comma-separated values
  NUMBER = 'NUMBER',             // numeric values
}
```

## Best Practices

### 1. Setting Naming Convention

```typescript
// Use descriptive, hierarchical names
const settings = [
  { name: 'maintenance_mode', type: 'BOOLEAN', value: 'false' },
  { name: 'max_file_upload_size', type: 'NUMBER', value: '10485760' },
  { name: 'allowed_file_types', type: 'ARRAY_OF_STRING', value: 'jpg,png,pdf,doc' },
  { name: 'email_notifications_enabled', type: 'BOOLEAN', value: 'true' },
  { name: 'session_timeout_minutes', type: 'NUMBER', value: '30' },
]
```

### 2. Setting Validation

```typescript
@Injectable()
export class SettingService {
  async validateSettingValue(value: string, type: ENUM_SETTING_DATA_TYPE): Promise<boolean> {
    switch (type) {
      case ENUM_SETTING_DATA_TYPE.BOOLEAN:
        return ['true', 'false'].includes(value.toLowerCase())
      case ENUM_SETTING_DATA_TYPE.NUMBER:
        return !isNaN(Number(value)) && Number(value) >= 0
      case ENUM_SETTING_DATA_TYPE.ARRAY_OF_STRING:
        return value.split(',').every(item => item.trim().length > 0)
      case ENUM_SETTING_DATA_TYPE.STRING:
        return value.trim().length > 0
      default:
        return false
    }
  }
}
```

### 3. Setting Caching

```typescript
@Injectable()
export class SettingService {
  private readonly settingsCache = new Map<string, any>()

  async getCachedSetting<T>(name: string): Promise<T> {
    if (this.settingsCache.has(name)) {
      return this.settingsCache.get(name)
    }

    const setting = await this.findOneByName(name)
    const value = this.getValue<T>(setting)
    this.settingsCache.set(name, value)
    
    return value
  }

  async invalidateCache(name?: string): Promise<void> {
    if (name) {
      this.settingsCache.delete(name)
    } else {
      this.settingsCache.clear()
    }
  }
}
```

## Scenario

### Complete Settings Management Flow

1. **Setting Creation**: Admin creates a new setting via API
2. **Value Validation**: System validates the setting value based on type
3. **Storage**: Setting is stored in MongoDB with proper indexing
4. **Runtime Access**: Application services access setting values
5. **Value Updates**: Admin updates setting values without restart
6. **Public Access**: Client applications access public settings

```typescript
// Complete settings flow example
@Controller('/admin/setting')
export class SettingAdminController {
  @Post('/')
  @AuthJwtAdminAccessProtected()
  async createSetting(@Body() body: SettingCreateDto): Promise<IResponse> {
    // 1. Validate setting value
    const isValid = await this.settingService.checkValue(body.value, body.type)
    if (!isValid) {
      throw new BadRequestException('Invalid setting value')
    }

    // 2. Create setting
    const setting = await this.settingService.create(body)
    
    // 3. Log the action
    await this.auditService.log({
      action: 'SETTING_CREATED',
      details: { name: body.name, type: body.type },
    })

    return {
      data: setting,
      message: 'setting.create',
    }
  }

  @Put('/update/:setting')
  @AuthJwtAdminAccessProtected()
  async updateSetting(
    @GetSetting() setting: SettingDoc,
    @Body() body: SettingUpdateValueDto
  ): Promise<IResponse> {
    // 1. Validate new value
    const isValid = await this.settingService.checkValue(body.value, body.type)
    if (!isValid) {
      throw new BadRequestException('Invalid setting value')
    }

    // 2. Update setting
    await this.settingService.updateValue(setting, body)
    
    // 3. Invalidate cache
    await this.settingService.invalidateCache(setting.name)
    
    // 4. Log the action
    await this.auditService.log({
      action: 'SETTING_UPDATED',
      details: { name: setting.name, oldValue: setting.value, newValue: body.value },
    })

    return {
      data: { _id: setting._id },
      message: 'setting.update',
    }
  }
}
```

This configuration and settings system provides a robust foundation for managing both static configuration and dynamic runtime settings with proper validation, type safety, and administrative controls.
