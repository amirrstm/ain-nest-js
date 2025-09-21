# Configuration Guide

This document provides comprehensive information about configuring AIN-NestJS for different environments and use cases.

## Table of Contents

- [Environment Variables](#environment-variables)
- [Application Configuration](#application-configuration)
- [Database Configuration](#database-configuration)
- [Authentication Configuration](#authentication-configuration)
- [External Services Configuration](#external-services-configuration)
- [Security Configuration](#security-configuration)
- [Performance Configuration](#performance-configuration)
- [Logging Configuration](#logging-configuration)
- [Environment-Specific Settings](#environment-specific-settings)

## Environment Variables

### Core Application Settings

```bash
# Application Identity
APP_NAME=AIN                     # Application name
APP_ENV=development              # Environment: development|staging|production
APP_LANGUAGE=en                  # Default language: en|fa
APP_TZ=UTC                      # Timezone (e.g., UTC, Asia/Tehran)
APP_MAINTENANCE=false           # Maintenance mode: true|false

# Frontend Integration
APP_FRONT_END_URL=http://localhost:3000  # Frontend application URL
```

### HTTP Server Configuration

```bash
# HTTP Settings
HTTP_VERSION=1                  # API version
HTTP_ENABLE=true               # Enable HTTP server: true|false
HTTP_HOST=0.0.0.0             # Bind address (0.0.0.0 for all interfaces)
HTTP_PORT=4000                # Server port
HTTP_VERSIONING_ENABLE=true   # Enable API versioning: true|false

# Node.js Environment
NODE_ENV=development          # Node environment: development|production
```

### Database Configuration

```bash
# MongoDB Settings
DATABASE_NAME=ain-database           # Database name
DATABASE_DEBUG=false                # Enable debug logging: true|false
DATABASE_HOST=mongodb://localhost:27017  # MongoDB connection string

# For authentication:
# DATABASE_HOST=mongodb://username:password@host:port/database

# For replica sets:
# DATABASE_HOST=mongodb://host1:port1,host2:port2/database?replicaSet=rs0

# For Atlas:
# DATABASE_HOST=mongodb+srv://username:password@cluster.mongodb.net/database
```

### Authentication & JWT Configuration

```bash
# JWT Settings
AUTH_JWT_SUBJECT=jwt-development        # JWT subject
AUTH_JWT_ISSUER=jwt-development         # JWT issuer
AUTH_JWT_AUDIENCE=https://localhost:4000 # JWT audience

# Token Expiration
AUTH_JWT_ACCESS_TOKEN_EXPIRED=30d       # Access token expiry (e.g., 1h, 7d, 30d)
AUTH_JWT_REFRESH_TOKEN_EXPIRED=182d     # Refresh token expiry

# Secret Keys (Generate with: openssl rand -hex 32)
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY=your-access-token-secret-key-here
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY=your-refresh-token-secret-key-here

# Payload Encryption (Optional)
AUTH_JWT_PAYLOAD_ENCRYPT=false          # Enable payload encryption: true|false
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY=your-32-char-encryption-key
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV=your-16-char-iv
AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY=your-32-char-refresh-key
AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV=your-16-char-refresh-iv
```

### External Services

```bash
# OpenAI Configuration
OPEN_AI_SECRET_KEY=sk-your-openai-api-key-here

# SMS Service (Optional)
SMS_API_KEY=your-sms-service-api-key

# Google OAuth2 (Optional)
SSO_GOOGLE_CLIENT_ID=your-google-client-id
SSO_GOOGLE_CLIENT_SECRET=your-google-client-secret
SSO_GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# LinkedIn OAuth2 (Optional)
SSO_LINKEDIN_CLIENT_ID=your-linkedin-client-id
SSO_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
SSO_LINKEDIN_CALLBACK_URL=http://localhost:4000/api/v1/auth/linkedin/callback

# AWS S3 Configuration (Optional)
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
AWS_S3_ENDPOINT=https://s3.amazonaws.com
AWS_S3_CREDENTIAL_KEY=your-aws-access-key-id
AWS_S3_CREDENTIAL_SECRET=your-aws-secret-access-key
```

### Feature Toggles

```bash
# System Features
DEBUGGER_WRITE_INTO_FILE=true   # Write debug logs to file: true|false
JOB_ENABLE=true                 # Enable background jobs: true|false

# AI Features
AI_VOICE_GENERATION_ENABLED=true
AI_RESUME_GENERATION_ENABLED=true
AI_CHAT_ENABLED=true
AI_ENHANCEMENT_ENABLED=true
```

## Application Configuration

### Configuration Modules

The application uses modular configuration through NestJS config modules:

```typescript
// src/configs/app.config.ts
export default registerAs('app', (): AppConfig => ({
  name: process.env.APP_NAME ?? 'AIN',
  env: process.env.APP_ENV ?? 'development',
  language: process.env.APP_LANGUAGE ?? 'en',
  timezone: process.env.APP_TZ ?? 'UTC',
  maintenance: process.env.APP_MAINTENANCE === 'true',

  http: {
    host: process.env.HTTP_HOST ?? '127.0.0.1',
    port: parseInt(process.env.HTTP_PORT) ?? 4000,
    versioning: process.env.HTTP_VERSIONING_ENABLE === 'true',
    version: parseInt(process.env.HTTP_VERSION) ?? 1
  },

  frontendUrl: process.env.APP_FRONT_END_URL ?? 'http://localhost:3000'
}));
```

### Validation Schema

Environment variables are validated using Joi:

```typescript
// src/configs/validation.schema.ts
export const validationSchema = Joi.object({
  APP_NAME: Joi.string().default('AIN'),
  APP_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  APP_LANGUAGE: Joi.string().valid('en', 'fa').default('en'),
  APP_TZ: Joi.string().default('UTC'),

  HTTP_HOST: Joi.string().ip().default('127.0.0.1'),
  HTTP_PORT: Joi.number().port().default(4000),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string().min(32).required(),
  AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string().min(32).required(),

  OPEN_AI_SECRET_KEY: Joi.string().required()
});
```

## Database Configuration

### MongoDB Connection Options

```typescript
// src/configs/database.config.ts
export default registerAs('database', (): DatabaseConfig => ({
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  debug: process.env.DATABASE_DEBUG === 'true',

  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority',
    retryAttempts: 3,
    retryDelay: 1000,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    bufferCommands: false
  }
}));
```

### Connection String Examples

#### Local MongoDB
```bash
DATABASE_HOST=mongodb://localhost:27017
```

#### MongoDB with Authentication
```bash
DATABASE_HOST=mongodb://username:password@localhost:27017
```

#### MongoDB Replica Set
```bash
DATABASE_HOST=mongodb://host1:27017,host2:27017,host3:27017/database?replicaSet=rs0
```

#### MongoDB Atlas
```bash
DATABASE_HOST=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Index Configuration

The application creates various indexes for optimal performance:

```typescript
// Database indexes are created automatically during startup
const indexes = [
  // User indexes
  { collection: 'users', index: { email: 1 }, options: { unique: true } },
  { collection: 'users', index: { mobileNumber: 1 }, options: { unique: true, sparse: true } },

  // Resume indexes
  { collection: 'resumes', index: { user: 1, isActive: 1 } },
  { collection: 'resumes', index: { createdAt: -1 } },

  // Chat indexes
  { collection: 'chats', index: { user: 1, createdAt: -1 } },

  // Template indexes
  { collection: 'templates', index: { isActive: 1, isPublic: 1 } }
];
```

## Authentication Configuration

### JWT Configuration

```typescript
// src/configs/auth.config.ts
export default registerAs('auth', (): AuthConfig => ({
  jwt: {
    subject: process.env.AUTH_JWT_SUBJECT ?? 'jwt-development',
    issuer: process.env.AUTH_JWT_ISSUER ?? 'jwt-development',
    audience: process.env.AUTH_JWT_AUDIENCE ?? 'https://localhost:4000',

    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
      expirationTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED ?? '30d',
      encryptKey: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV
    },

    refreshToken: {
      secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY,
      expirationTime: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED ?? '182d',
      encryptKey: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV
    },

    payloadEncryption: process.env.AUTH_JWT_PAYLOAD_ENCRYPT === 'true'
  },

  passwordAttempt: {
    maxAttempts: 5,
    blockDuration: 15 * 60 * 1000 // 15 minutes
  }
}));
```

### OAuth2 Configuration

#### Google OAuth2 Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Navigate to APIs & Services > Library
   - Search and enable "Google+ API"

3. **Create OAuth2 Credentials**
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 client ID
   - Set authorized redirect URI: `https://yourdomain.com/api/v1/auth/google/callback`

4. **Configure Environment**
   ```bash
   SSO_GOOGLE_CLIENT_ID=your-google-client-id
   SSO_GOOGLE_CLIENT_SECRET=your-google-client-secret
   SSO_GOOGLE_CALLBACK_URL=https://yourdomain.com/api/v1/auth/google/callback
   ```

#### LinkedIn OAuth2 Setup

1. **Create LinkedIn App**
   - Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
   - Create a new app

2. **Configure OAuth2**
   - Add redirect URL: `https://yourdomain.com/api/v1/auth/linkedin/callback`
   - Request necessary permissions: `r_liteprofile`, `r_emailaddress`

3. **Configure Environment**
   ```bash
   SSO_LINKEDIN_CLIENT_ID=your-linkedin-client-id
   SSO_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   SSO_LINKEDIN_CALLBACK_URL=https://yourdomain.com/api/v1/auth/linkedin/callback
   ```

## External Services Configuration

### OpenAI Configuration

```typescript
// src/configs/ai.config.ts
export default registerAs('ai', (): AIConfig => ({
  openai: {
    apiKey: process.env.OPEN_AI_SECRET_KEY,
    organization: process.env.OPEN_AI_ORGANIZATION,

    models: {
      default: process.env.OPENAI_DEFAULT_MODEL ?? 'gpt-3.5-turbo',
      chat: process.env.OPENAI_CHAT_MODEL ?? 'gpt-3.5-turbo',
      voice: process.env.OPENAI_VOICE_MODEL ?? 'whisper-1',
      image: process.env.OPENAI_IMAGE_MODEL ?? 'dall-e-3'
    },

    limits: {
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) ?? 2000,
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE) ?? 0.7,
      timeout: parseInt(process.env.OPENAI_TIMEOUT_MS) ?? 30000,
      retries: parseInt(process.env.OPENAI_MAX_RETRIES) ?? 3
    }
  }
}));
```

### AWS S3 Configuration

```typescript
// src/configs/file.config.ts
export default registerAs('file', (): FileConfig => ({
  aws: {
    region: process.env.AWS_S3_REGION ?? 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET,
    endpoint: process.env.AWS_S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_S3_CREDENTIAL_KEY,
      secretAccessKey: process.env.AWS_S3_CREDENTIAL_SECRET
    }
  },

  upload: {
    maxFileSize: parseInt(process.env.FILE_MAX_SIZE_MB) ?? 10,
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'audio/mpeg',
      'audio/wav',
      'audio/mp4'
    ]
  }
}));
```

### SMS Service Configuration

```typescript
// src/configs/sms.config.ts
export default registerAs('sms', (): SMSConfig => ({
  provider: process.env.SMS_PROVIDER ?? 'default',
  apiKey: process.env.SMS_API_KEY,

  templates: {
    verification: 'Your verification code is: {code}',
    passwordReset: 'Reset your password with code: {code}'
  },

  settings: {
    codeLength: 6,
    expirationMinutes: 5,
    maxAttempts: 3
  }
}));
```

## Security Configuration

### Rate Limiting

```typescript
// src/configs/security.config.ts
export default registerAs('security', (): SecurityConfig => ({
  rateLimit: {
    global: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // requests per window
    },

    auth: {
      windowMs: 15 * 60 * 1000,
      max: 5 // login attempts per window
    },

    ai: {
      windowMs: 60 * 1000, // 1 minute
      max: 10 // AI requests per minute
    }
  },

  cors: {
    origin: process.env.APP_FRONT_END_URL,
    credentials: true,
    optionsSuccessStatus: 200
  },

  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    }
  }
}));
```

### Password Policy

```typescript
const passwordPolicy = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
  preventCommonPasswords: true,
  preventUserInfo: true
};
```

## Performance Configuration

### Caching Configuration

```typescript
// src/configs/cache.config.ts
export default registerAs('cache', (): CacheConfig => ({
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT) ?? 6379,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB) ?? 0,

    options: {
      retryAttempts: 3,
      retryDelay: 1000,
      maxRetriesPerRequest: 3
    }
  },

  ttl: {
    default: 300, // 5 minutes
    templates: 3600, // 1 hour
    publicData: 1800, // 30 minutes
    userSession: 86400 // 24 hours
  }
}));
```

### Database Optimization

```typescript
const dbOptimization = {
  // Connection pool settings
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,

  // Query optimization
  allowDiskUse: true,
  maxTimeMS: 10000,

  // Write concern
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 5000
  }
};
```

## Logging Configuration

### Winston Logger Configuration

```typescript
// src/configs/logger.config.ts
export default registerAs('logger', (): LoggerConfig => ({
  level: process.env.LOG_LEVEL ?? 'info',

  file: {
    enabled: process.env.DEBUGGER_WRITE_INTO_FILE === 'true',
    path: process.env.LOG_FILE_PATH ?? './logs',
    maxFiles: '14d',
    maxSize: '20m'
  },

  console: {
    enabled: process.env.NODE_ENV === 'development',
    colorize: true,
    timestamp: true
  },

  database: {
    enabled: process.env.LOG_TO_DATABASE === 'true',
    level: 'error'
  }
}));
```

### Log Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `error` | Error events | Application errors, exceptions |
| `warn` | Warning events | Deprecated API usage, poor performance |
| `info` | Informational | User actions, system events |
| `http` | HTTP requests | API calls, request/response logs |
| `verbose` | Verbose info | Detailed operation logs |
| `debug` | Debug info | Development debugging |
| `silly` | Very detailed | Trace-level debugging |

## Environment-Specific Settings

### Development Environment

```bash
# .env.development
APP_ENV=development
NODE_ENV=development
DATABASE_DEBUG=true
DEBUGGER_WRITE_INTO_FILE=true
LOG_LEVEL=debug

# Relaxed security for development
AUTH_JWT_PAYLOAD_ENCRYPT=false
```

### Staging Environment

```bash
# .env.staging
APP_ENV=staging
NODE_ENV=production
DATABASE_DEBUG=false
DEBUGGER_WRITE_INTO_FILE=true
LOG_LEVEL=info

# Production-like security
AUTH_JWT_PAYLOAD_ENCRYPT=true
```

### Production Environment

```bash
# .env.production
APP_ENV=production
NODE_ENV=production
DATABASE_DEBUG=false
DEBUGGER_WRITE_INTO_FILE=false
LOG_LEVEL=warn

# Maximum security
AUTH_JWT_PAYLOAD_ENCRYPT=true
```

### Configuration Validation

The application validates configuration on startup:

```typescript
// Validation middleware
export class ConfigValidationService {
  @Injectable()
  static validate(config: Record<string, unknown>) {
    const { error, value } = validationSchema.validate(config, {
      allowUnknown: true,
      abortEarly: false
    });

    if (error) {
      throw new Error(`Configuration validation error: ${error.message}`);
    }

    return value;
  }
}
```

### Environment File Priority

The application loads environment variables in this order:

1. System environment variables
2. `.env.{NODE_ENV}.local` (e.g., `.env.production.local`)
3. `.env.{NODE_ENV}` (e.g., `.env.production`)
4. `.env.local`
5. `.env`

### Secret Management

For production deployments, consider using secret management services:

#### AWS Secrets Manager
```typescript
// Example: Loading secrets from AWS
const secrets = await secretsManager.getSecretValue({
  SecretId: 'ain-nestjs/production'
}).promise();

process.env.DATABASE_HOST = JSON.parse(secrets.SecretString).database_host;
```

#### HashiCorp Vault
```typescript
// Example: Loading secrets from Vault
const secrets = await vault.read('secret/data/ain-nestjs');
process.env.OPEN_AI_SECRET_KEY = secrets.data.data.openai_key;
```

This configuration guide provides all the necessary information to properly configure AIN-NestJS for any environment.