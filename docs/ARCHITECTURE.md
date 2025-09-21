# Architecture Overview

This document provides a comprehensive overview of the AIN-NestJS architecture, design patterns, and system components.

## Table of Contents

- [System Architecture](#system-architecture)
- [Application Structure](#application-structure)
- [Design Patterns](#design-patterns)
- [Data Flow](#data-flow)
- [Module Architecture](#module-architecture)
- [Security Architecture](#security-architecture)
- [External Integrations](#external-integrations)

## System Architecture

AIN-NestJS follows a modular, layered architecture built on top of the NestJS framework, providing a scalable and maintainable backend service for AI-powered resume generation.

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  (Web Apps, Mobile Apps, Third-party Integrations)        │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     API Gateway                             │
│  (Authentication, Rate Limiting, CORS, Validation)         │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 Application Layer                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Controllers │ │ Guards      │ │ Interceptors│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 Business Logic Layer                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Services    │ │ Use Cases   │ │ Validators  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 Data Access Layer                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Repositories│ │ ODM Models  │ │ Serializers │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 External Services                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ MongoDB     │ │ OpenAI API  │ │ AWS S3      │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Application Structure

The application follows a modular structure with clear separation of concerns:

```
src/
├── app/                    # Core application modules
│   ├── app.module.ts      # Root application module
│   └── app.controller.ts  # Health check and basic endpoints
├── common/                # Shared utilities and common code
│   ├── auth/              # Authentication utilities
│   ├── database/          # Database abstractions
│   ├── decorators/        # Custom decorators
│   ├── guards/            # Authorization guards
│   ├── helpers/           # Utility functions
│   ├── interceptors/      # Request/response interceptors
│   ├── pipes/             # Data transformation pipes
│   └── serializers/       # Response serialization
├── configs/               # Configuration modules
│   ├── app.config.ts      # Application configuration
│   ├── auth.config.ts     # Authentication configuration
│   ├── database.config.ts # Database configuration
│   └── file.config.ts     # File storage configuration
├── modules/               # Feature modules
│   ├── user/              # User management
│   ├── auth/              # Authentication
│   ├── resume/            # Resume operations
│   ├── chat/              # AI chat functionality
│   ├── plan/              # Subscription plans
│   ├── template/          # Resume templates
│   └── ...                # Other feature modules
├── health/                # Health check module
├── jobs/                  # Background job processing
├── languages/             # Internationalization
├── migration/             # Database migrations
├── router/                # API routing configuration
├── types/                 # TypeScript type definitions
├── main.ts                # Application entry point
└── swagger.ts             # API documentation setup
```

## Design Patterns

### 1. Module Pattern
Each feature is organized as a NestJS module with clear boundaries:

```typescript
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
```

### 2. Repository Pattern
Data access is abstracted through repository pattern:

```typescript
@Injectable()
export class UserRepository extends DatabaseMongoObjectIdRepositoryAbstract<
  UserDoc,
  UserEntity
> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDoc>
  ) {
    super(userModel);
  }
}
```

### 3. Dependency Injection
Services are loosely coupled through NestJS's dependency injection:

```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}
}
```

### 4. Guard Pattern
Authentication and authorization through guards:

```typescript
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(ENUM_ROLE_TYPE.ADMIN)
@Controller('admin/users')
export class UserAdminController {}
```

## Data Flow

### 1. Request Flow
```
Client Request → Middleware → Guards → Interceptors → Controller → Service → Repository → Database
```

### 2. Response Flow
```
Database → Repository → Service → Controller → Interceptors → Serializers → Client Response
```

### 3. AI Processing Flow
```
User Input → Validation → Service → OpenAI API → Data Processing → Database → Response
```

## Module Architecture

### Core Modules

#### 1. User Module
- **Purpose**: User management, profile operations
- **Components**: UserController, UserService, UserRepository
- **Responsibilities**: User CRUD, profile management, role assignment

#### 2. Auth Module
- **Purpose**: Authentication and authorization
- **Components**: AuthController, AuthService, Guards, Strategies
- **Responsibilities**: Login, registration, JWT management, OAuth integration

#### 3. Resume Module
- **Purpose**: Resume generation and management
- **Components**: ResumeController, ResumeService, ResumeRepository
- **Responsibilities**: Resume CRUD, AI generation, PDF conversion

#### 4. Chat Module
- **Purpose**: AI-powered chat functionality
- **Components**: ChatController, ChatService, ChatRepository
- **Responsibilities**: Conversation management, OpenAI integration

#### 5. Plan Module
- **Purpose**: Subscription and usage management
- **Components**: PlanController, PlanService, PlanRepository
- **Responsibilities**: Plan management, usage tracking, billing

### Shared Modules

#### 1. Common Module
- **Purpose**: Shared utilities and abstractions
- **Components**: Guards, Interceptors, Pipes, Decorators
- **Responsibilities**: Cross-cutting concerns, utilities

#### 2. Config Module
- **Purpose**: Application configuration
- **Components**: Configuration providers
- **Responsibilities**: Environment management, settings

## Security Architecture

### 1. Authentication Layer
```
┌─────────────────────────────────────────────────────────┐
│                  Authentication                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │JWT Strategy │ │OAuth2 (G,L) │ │API Key Auth │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### 2. Authorization Layer
```
┌─────────────────────────────────────────────────────────┐
│                  Authorization                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │Role Guards  │ │Permission   │ │Resource     │       │
│  │             │ │Guards       │ │Guards       │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### 3. Data Protection
- **Encryption**: JWT payload encryption, password hashing
- **Validation**: Input validation, sanitization
- **Rate Limiting**: API throttling, abuse prevention

## External Integrations

### 1. OpenAI Integration
```typescript
interface OpenAIService {
  generateText(prompt: string, model: string): Promise<string>;
  transcribeAudio(audioFile: Buffer): Promise<string>;
  generateImage(prompt: string): Promise<string>;
}
```

### 2. AWS S3 Integration
```typescript
interface FileService {
  upload(file: Express.Multer.File, path: string): Promise<string>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string): Promise<string>;
}
```

### 3. Database Integration
```typescript
interface DatabaseRepository<T> {
  create(data: T): Promise<T>;
  findById(id: string): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
```

## Performance Considerations

### 1. Caching Strategy
- **Memory Cache**: Frequently accessed data
- **Database Indexing**: Optimized queries
- **CDN**: Static file delivery

### 2. Scalability
- **Horizontal Scaling**: Multiple application instances
- **Database Sharding**: Data distribution
- **Load Balancing**: Request distribution

### 3. Monitoring
- **Health Checks**: Application status monitoring
- **Logging**: Structured logging with Winston
- **Error Tracking**: Sentry integration

## Development Patterns

### 1. Error Handling
```typescript
try {
  const result = await this.service.process(data);
  return result;
} catch (error) {
  this.logger.error('Processing failed', error);
  throw new InternalServerErrorException('Processing failed');
}
```

### 2. Validation
```typescript
@ApiProperty()
@IsString()
@IsNotEmpty()
@Transform(({ value }) => value.trim())
readonly name: string;
```

### 3. Serialization
```typescript
@Exclude()
password: string;

@Expose()
@Transform(({ value }) => value.toString())
id: string;
```

This architecture ensures maintainability, scalability, and security while providing a solid foundation for the AI-powered resume generation platform.