# Multi-Language Support

This document explains how multi-language support works in the AIN-NestJS application, including configuration, implementation, and usage examples.

## Prerequisites

- NestJS application with `nestjs-i18n` package installed
- Understanding of NestJS modules, services, and middleware
- Basic knowledge of internationalization (i18n) concepts

## Purpose

The multi-language system provides:

- **Dynamic language switching** based on request headers
- **Structured message management** with JSON files
- **Fallback language support** for missing translations
- **Type-safe message retrieval** with TypeScript interfaces
- **Validation error translation** for better user experience

## Description

The application uses `nestjs-i18n` library to provide comprehensive multi-language support. The system supports three languages:

- **English (en)** - Default language
- **Persian/Farsi (fa)** - RTL language support

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │    │   Middleware     │    │   Message       │
│   Request       │───▶│   Language       │───▶│   Service       │
│                 │    │   Detection      │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Language       │    │   JSON          │
                       │   Files          │    │   Messages      │
                       │   (en/fa)     │    │                 │
                       └──────────────────┘    └─────────────────┘
```

## Configuration

### 1. Message Configuration (`src/configs/message.config.ts`)

```typescript
export default registerAs(
  'message',
  (): Record<string, any> => ({
    availableLanguage: Object.values(ENUM_MESSAGE_LANGUAGE), // ['en', 'fa']
    language: process.env.APP_LANGUAGE ?? APP_LANGUAGE, // Default: 'en'
  })
)
```

### 2. Language Enum (`src/common/message/constants/message.enum.constant.ts`)

```typescript
export enum ENUM_MESSAGE_LANGUAGE {
  EN = 'en',
  ID = 'id', 
  FA = 'fa',
}
```

### 3. I18n Module Setup (`src/common/message/message.module.ts`)

```typescript
I18nModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    fallbackLanguage: configService.get<string[]>('message.availableLanguage').join(','),
    fallbacks: Object.values(ENUM_MESSAGE_LANGUAGE).reduce((a, v) => ({ ...a, [`${v}-*`]: v }), {}),
    loaderOptions: {
      path: path.join(__dirname, '../../languages'),
      watch: true,
    },
  }),
  loader: I18nJsonLoader,
  inject: [ConfigService],
  resolvers: [new HeaderResolver(['x-custom-lang'])],
})
```

## Language File Structure

Language files are organized in `src/languages/` directory:

```
src/languages/
├── en/                    # English translations
│   ├── app.json
│   ├── auth.json
│   ├── user.json
│   ├── chat.json
│   └── ...
├── fa/                    # Persian translations
│   ├── app.json
│   ├── auth.json
│   ├── user.json
│   ├── chat.json
│   └── ...
└── id/                    # Indonesian translations
    ├── app.json
    └── request.json
```

### Example Language Files

**English (`src/languages/en/user.json`):**
```json
{
  "list": "User list retrieved successfully.",
  "create": "User created successfully.",
  "error": {
    "notFound": "User not found.",
    "emailExist": "Email already in use."
  }
}
```

**Persian (`src/languages/fa/user.json`):**
```json
{
  "list": "فهرست کاربران با موفقیت انجام شد.",
  "create": "ایجاد کاربر با موفقیت انجام شد.",
  "error": {
    "notFound": "کاربر یافت نشد.",
    "emailExist": "ایمیل قبلا استفاده شده است"
  }
}
```

## Language Detection Middleware

The `MessageCustomLanguageMiddleware` automatically detects the client's preferred language:

```typescript
@Injectable()
export class MessageCustomLanguageMiddleware implements NestMiddleware {
  async use(req: IRequestApp, res: Response, next: NextFunction): Promise<void> {
    let language: string = this.messageService.getLanguage()
    const availableLanguages: string[] = this.messageService.getAvailableLanguages()
    
    const reqLanguages: string = req.headers['x-custom-lang'] as string
    if (reqLanguages) {
      const splitLanguage: string[] = reqLanguages.split(',').map(val => val.toLowerCase())
      const languages: string[] = this.helperArrayService.intersection(availableLanguages, splitLanguage)
      
      if (languages.length > 0) {
        language = languages.join(',')
        customLang = languages
      }
    }
    
    req.__customLang = customLang
    req.__xCustomLang = language
    req.headers['x-custom-lang'] = language
    
    next()
  }
}
```

## Message Service Interface

The `MessageService` provides methods for message retrieval and management:

```typescript
export interface IMessageService {
  getAvailableLanguages(): string[]
  getLanguage(): string
  filterLanguage(customLanguages: string[]): string[]
  setMessage(lang: string, key: string, options?: IMessageSetOptions): string
  getRequestErrorsMessage(requestErrors: ValidationError[], options?: IMessageErrorOptions): IErrors[]
  getImportErrorsMessage(errors: IValidationErrorImport[], options?: IMessageErrorOptions): IErrorsImport[]
  get<T = string>(key: string, options?: IMessageOptions): T
}
```

## How to Use

### 1. Basic Message Retrieval

```typescript
// In a controller or service
constructor(private readonly messageService: MessageService) {}

// Get a single message in default language
const message = this.messageService.get<string>('user.create')

// Get a message with custom language
const message = this.messageService.get<string>('user.create', {
  customLanguages: ['fa']
})

// Get messages in multiple languages
const messages = this.messageService.get<Record<string, string>>('user.create', {
  customLanguages: ['en', 'fa']
})
// Returns: { en: "User created successfully.", fa: "ایجاد کاربر با موفقیت انجام شد." }
```

### 2. Using in Controllers

```typescript
@Controller('/user')
export class UserController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() body: CreateUserDto, @RequestCustomLang() customLang: string[]): Promise<IResponse> {
    // Language is automatically detected from x-custom-lang header
    const user = await this.userService.create(body)
    
    return {
      data: user,
      message: this.messageService.get('user.create', {
        customLanguages: customLang
      })
    }
  }
}
```

### 3. Error Message Translation

```typescript
// Validation errors are automatically translated
@Post()
async create(@Body() body: CreateUserDto): Promise<IResponse> {
  try {
    const user = await this.userService.create(body)
    return { data: user }
  } catch (error) {
    throw new ConflictException({
      statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
      message: 'user.error.notFound', // This will be translated based on request language
    })
  }
}
```

### 4. Client-Side Usage

Send language preference via HTTP header:

```javascript
// Frontend request
fetch('/api/v1/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-custom-lang': 'fa', // Persian
  },
  body: JSON.stringify(userData)
})

// Multiple language preferences (fallback order)
fetch('/api/v1/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-custom-lang': 'fa,en', // Try Persian first, then English
  },
  body: JSON.stringify(userData)
})
```

### 5. Message with Variables

```json
// In language files
{
  "hello": "Hello {name}, welcome to {serviceName}!"
}
```

```typescript
// Usage with variables
const message = this.messageService.get('app.hello', {
  properties: {
    name: 'John',
    serviceName: 'AIN Platform'
  }
})
// Returns: "Hello John, welcome to AIN Platform!"
```

## AI Language Integration

The application also integrates language detection with AI features:

```typescript
// AI language constant
export const AI_LANG = (lang: string): string => {
  switch (lang) {
    case 'fa':
      return 'Persian'
    case 'id':
      return 'Indonesian'
    default:
      return 'English'
  }
}

// Usage in AI prompts
async chat(@RequestCustomLang() customLang: string[]) {
  const lang = customLang[0]
  const systemPrompt = `${AI_LANG(lang)}` // Converts 'fa' to 'Persian'
  
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage }
  ]
  
  return await this.aiService.getChatFromPrompt(messages)
}
```

## Params and Options

### Message Options Interface

```typescript
export interface IMessageOptions {
  readonly customLanguages?: string[]     // Specific languages to retrieve
  readonly properties?: IMessageOptionsProperties  // Variables for message interpolation
}

export interface IMessageOptionsProperties {
  readonly [key: string]: string | number  // Key-value pairs for message variables
}
```

### Supported Parameters

- **customLanguages**: Array of language codes (e.g., `['en', 'fa']`)
- **properties**: Object with variables for message interpolation
- **x-custom-lang**: HTTP header for language preference
- **fallbackLanguage**: Default language when translation is missing

## Best Practices

### 1. Language File Organization

- Keep translations organized by feature/module
- Use nested objects for related messages
- Maintain consistent key naming across languages

### 2. Error Handling

```typescript
// Always provide meaningful error messages
throw new ConflictException({
  statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
  message: 'user.error.notFound', // Use descriptive keys
})
```

### 3. Testing

```typescript
// Test with different languages
describe('UserController', () => {
  it('should create user with Persian messages', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/user')
      .set('x-custom-lang', 'fa')
      .send(userData)
    
    expect(response.body.message).toBe('ایجاد کاربر با موفقیت انجام شد.')
  })
})
```

## Scenario

### Complete User Registration Flow

1. **Client Request**: User submits registration form with `x-custom-lang: fa` header
2. **Middleware Processing**: Language middleware detects Persian preference
3. **Validation**: Form validation runs with Persian error messages
4. **Business Logic**: User creation with Persian success messages
5. **Response**: API returns Persian confirmation message

```typescript
// Client request
POST /api/v1/user/sign-up
Headers: { 'x-custom-lang': 'fa' }
Body: { email: 'user@example.com', password: 'password123' }

// Server response (Persian)
{
  "statusCode": 201,
  "message": "ثبت‌نام با موفقیت انجام شد",
  "data": { /* user data */ }
}
```

This multi-language system ensures a seamless user experience across different languages while maintaining code maintainability and type safety.