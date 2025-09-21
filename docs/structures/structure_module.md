# Module Structure Guide

This document provides a comprehensive guide to the standardized module structure used throughout the AIN-NestJS application. Understanding this structure is crucial for maintaining consistency and ensuring scalability.

## Table of Contents

- [Overview](#overview)
- [Module Structure Template](#module-structure-template)
- [Directory Breakdown](#directory-breakdown)
- [Implementation Examples](#implementation-examples)
- [Best Practices](#best-practices)
- [Creating a New Module](#creating-a-new-module)
- [Common Patterns](#common-patterns)

## Overview

Every feature module in AIN-NestJS follows a consistent, modular structure that promotes:

- **Single Responsibility**: Each directory has a specific purpose
- **Separation of Concerns**: Business logic, data access, and presentation are separated
- **Reusability**: Components can be easily reused across modules
- **Testability**: Clear structure makes testing straightforward
- **Maintainability**: Easy to locate and modify specific functionality

## Module Structure Template

```
src/modules/[module-name]/
├── 📁 abstracts/                    # Abstract classes and base implementations
├── 📁 constants/                    # Enums, status codes, and static values
├── 📁 controllers/                  # HTTP route handlers and API endpoints
├── 📁 decorators/                   # Custom decorators specific to this module
├── 📁 dtos/                         # Data Transfer Objects for validation
├── 📁 docs/                         # Swagger/OpenAPI documentation
├── 📁 errors/                       # Custom error classes and handlers
├── 📁 factories/                    # Factory patterns and object creation
├── 📁 filters/                      # Custom exception filters
├── 📁 guards/                       # Authentication and authorization guards
├── 📁 indicators/                   # Health check indicators
├── 📁 interceptors/                 # Request/response interceptors
├── 📁 interfaces/                   # TypeScript interfaces and contracts
├── 📁 middleware/                   # Custom middleware functions
├── 📁 pipes/                        # Data transformation and validation pipes
├── 📁 repository/                   # Data access layer
│   ├── 📁 entities/                 # Database entity definitions
│   ├── 📁 repositories/             # Repository implementations
│   └── 📄 [module-name].repository.module.ts # Repository module configuration
├── 📁 serializations/               # Response serialization classes
├── 📁 services/                     # Business logic and service layer
├── 📁 tasks/                        # Cron jobs and scheduled tasks
└── 📄 [module-name].module.ts      # Main module configuration
```

## Directory Breakdown

### 📁 `abstracts/` - Abstract Classes

**Purpose**: Contains abstract base classes and common implementations that can be extended by other classes within the module.

```typescript
// abstracts/base-user.abstract.ts
export abstract class BaseUserAbstract {
  abstract validateUser(data: any): Promise<boolean>;
  abstract processUserData(data: any): Promise<any>;

  protected formatUserName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`.trim();
  }
}
```

**When to use**:
- Shared functionality across multiple services
- Common validation patterns
- Base implementations for strategy patterns

### 📁 `constants/` - Constants and Enums

**Purpose**: Defines module-specific enums, status codes, static values, and configuration constants.

```typescript
// constants/user.enum.constant.ts
export enum ENUM_USER_STATUS_CODE_ERROR {
  USER_NOT_FOUND_ERROR = 5100,
  USER_EMAIL_EXIST_ERROR = 5101,
  USER_MOBILE_NUMBER_EXIST_ERROR = 5102,
  USER_BLOCKED_ERROR = 5103,
}

export enum ENUM_USER_SIGN_UP_FROM {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  LINKEDIN = 'LINKEDIN',
}

// constants/user.constant.ts
export const USER_DEFAULT_PAGE = 1;
export const USER_DEFAULT_PER_PAGE = 20;
export const USER_DEFAULT_ORDER_BY = 'createdAt';
export const USER_DEFAULT_ORDER_DIRECTION = 'asc';
```

**What to include**:
- Status codes and error codes
- Enum definitions
- Default values and limits
- Module-specific constants

### 📁 `controllers/` - API Controllers

**Purpose**: Handles HTTP requests, processes input, calls services, and returns responses.

```typescript
// controllers/user.public.controller.ts
@ApiTags('modules.public.user')
@Controller({
  version: '1',
  path: '/user',
})
export class UserPublicController {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  @Get('/list')
  @ApiOperation({ summary: 'Get user list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User list retrieved successfully',
  })
  async list(
    @Query() query: UserListDto,
    @RequestCustomLang() customLang: string[]
  ): Promise<IResponse> {
    const users = await this.userService.findAll(query);

    return {
      data: users,
      message: this.messageService.get('user.list', { customLanguages: customLang }),
    };
  }
}
```

**Controller Types**:
- **Public Controllers**: Open endpoints (no authentication)
- **User Controllers**: User-specific authenticated endpoints
- **Admin Controllers**: Administrative endpoints

### 📁 `decorators/` - Custom Decorators

**Purpose**: Module-specific decorators for validation, transformation, or metadata.

```typescript
// decorators/user.decorator.ts
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserDoc => {
    const { user } = ctx.switchToHttp().getRequest<IRequestApp & { user: UserDoc }>();
    return data ? user[data] : user;
  }
);

export function UserEmailMustUnique(): PropertyDecorator {
  return applyDecorators(
    IsEmail(),
    IsNotEmpty(),
    Transform(({ value }) => value.toLowerCase().trim()),
    IsUserEmailNotExist()
  );
}
```

**Common Decorator Types**:
- Parameter extractors
- Validation decorators
- Transformation decorators
- Metadata decorators

### 📁 `dtos/` - Data Transfer Objects

**Purpose**: Defines request/response validation schemas and data transfer objects.

```typescript
// dtos/request/user.create.dto.ts
export class UserCreateDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Transform(({ value }) => value.trim())
  readonly firstName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    required: true,
  })
  @UserEmailMustUnique()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
    required: true,
  })
  @IsPasswordStrong()
  readonly password: string;
}
```

**DTO Categories**:
- **Request DTOs**: Input validation (`*.create.dto.ts`, `*.update.dto.ts`)
- **Response DTOs**: Output formatting (`*.response.dto.ts`)
- **Query DTOs**: Query parameter validation (`*.list.dto.ts`)

### 📁 `docs/` - API Documentation

**Purpose**: Swagger/OpenAPI documentation specific to the module.

```typescript
// docs/user.doc.ts
export const UserCreateDoc: IApiDocOptions<UserCreateDto> = {
  operation: {
    summary: 'Create new user',
    description: 'Creates a new user account with email verification',
  },
  request: {
    bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    body: UserCreateDto,
  },
  response: {
    statusCode: HttpStatus.CREATED,
    serialization: UserGetSerialization,
  },
  error: {
    statusCode: [
      HttpStatus.BAD_REQUEST,
      HttpStatus.UNPROCESSABLE_ENTITY,
      HttpStatus.CONFLICT,
    ],
  },
};
```

### 📁 `errors/` - Custom Errors

**Purpose**: Module-specific error classes and error handling.

```typescript
// errors/user.error.ts
export class UserEmailAlreadyExistsError extends ConflictException {
  constructor() {
    super({
      statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
      message: 'user.error.emailExist',
    });
  }
}

export class UserNotFoundError extends NotFoundException {
  constructor(userId?: string) {
    super({
      statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
      message: 'user.error.notFound',
      data: userId ? { userId } : undefined,
    });
  }
}
```

### 📁 `factories/` - Factory Patterns

**Purpose**: Object creation and configuration using factory patterns.

```typescript
// factories/user.factory.ts
@Injectable()
export class UserFactory {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService
  ) {}

  async createFromLocal(dto: UserCreateDto): Promise<Partial<UserEntity>> {
    const role = await this.roleService.findOneByName('user');
    const password = await this.authService.createPassword(dto.password);

    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email.toLowerCase(),
      role: role._id,
      password: password.passwordHash,
      salt: password.salt,
      signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
      signUpDate: new Date(),
    };
  }

  async createFromGoogle(googleProfile: GoogleProfile): Promise<Partial<UserEntity>> {
    const role = await this.roleService.findOneByName('user');

    return {
      firstName: googleProfile.firstName,
      lastName: googleProfile.lastName,
      email: googleProfile.email.toLowerCase(),
      role: role._id,
      signUpFrom: ENUM_USER_SIGN_UP_FROM.GOOGLE,
      signUpDate: new Date(),
      avatar: googleProfile.picture,
    };
  }
}
```

### 📁 `guards/` - Security Guards

**Purpose**: Authentication, authorization, and validation guards specific to the module.

```typescript
// guards/user.can-update.guard.ts
@Injectable()
export class UserCanUpdateGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp>();
    const { user } = request;
    const userId = request.params?.id;

    if (!userId) {
      throw new BadRequestException('user.error.idRequired');
    }

    // Users can only update their own profile, admins can update any
    if (user.role.type === ENUM_ROLE_TYPE.ADMIN) {
      return true;
    }

    return user._id.toString() === userId;
  }
}
```

### 📁 `interfaces/` - Type Definitions

**Purpose**: TypeScript interfaces and type definitions specific to the module.

```typescript
// interfaces/user.interface.ts
export interface IUserService {
  findAll(query: UserListDto): Promise<UserDoc[]>;
  findOneById(id: string): Promise<UserDoc>;
  findOneByEmail(email: string): Promise<UserDoc>;
  create(data: UserCreateDto): Promise<UserDoc>;
  update(id: string, data: UserUpdateDto): Promise<UserDoc>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository {
  findAll(
    find?: Record<string, any>,
    options?: DatabaseFindAllOptions
  ): Promise<UserDoc[]>;
  findOneById(
    _id: string,
    options?: DatabaseFindOneOptions
  ): Promise<UserDoc>;
  create(
    data: UserEntity,
    options?: DatabaseCreateOptions
  ): Promise<UserDoc>;
}

export interface IUserAuthPayload {
  _id: string;
  email: string;
  role: {
    _id: string;
    type: ENUM_ROLE_TYPE;
    name: string;
  };
  loginDate: Date;
  loginFrom: ENUM_AUTH_LOGIN_FROM;
}
```

### 📁 `repository/` - Data Access Layer

**Purpose**: Database entities, repositories, and data access logic.

#### `entities/` - Database Entities

```typescript
// repository/entities/user.entity.ts
@Schema({ timestamps: true })
export class UserEntity {
  @Prop({
    required: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    index: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    required: true,
    index: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    required: true,
    ref: RoleEntity.name,
    index: true,
  })
  role: Types.ObjectId;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  salt: string;

  @Prop({
    required: true,
    enum: ENUM_USER_SIGN_UP_FROM,
    index: true,
  })
  signUpFrom: ENUM_USER_SIGN_UP_FROM;

  @Prop({
    required: true,
    default: Date.now,
  })
  signUpDate: Date;

  @Prop({
    default: true,
    index: true,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
export type UserDoc = UserEntity & Document<string>;
```

#### `repositories/` - Repository Implementation

```typescript
// repository/repositories/user.repository.ts
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

  async findOneByEmail(
    email: string,
    options?: DatabaseFindOneOptions
  ): Promise<UserDoc> {
    return this.userModel.findOne({ email: email.toLowerCase() }, options);
  }

  async existByEmail(email: string): Promise<boolean> {
    const exist = await this.userModel.exists({
      email: email.toLowerCase()
    });
    return exist ? true : false;
  }

  async updatePasswordAttempt(
    _id: string,
    passwordAttempt: number
  ): Promise<UserDoc> {
    return this.userModel.findByIdAndUpdate(
      _id,
      { passwordAttempt },
      { new: true }
    );
  }
}
```

### 📁 `serializations/` - Response Serialization

**Purpose**: Defines how data is serialized for API responses.

```typescript
// serializations/user.get.serialization.ts
export class UserGetSerialization {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @Type(() => String)
  readonly _id: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  readonly firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  readonly lastName: string;

  @ApiProperty({
    description: 'User role information',
    type: () => RoleGetSerialization,
  })
  @Type(() => RoleGetSerialization)
  readonly role: RoleGetSerialization;

  @ApiProperty({
    description: 'Account creation date',
    example: '2023-01-01T00:00:00.000Z',
  })
  readonly createdAt: Date;

  @Exclude()
  readonly password: string;

  @Exclude()
  readonly salt: string;

  @Exclude()
  readonly passwordAttempt: number;
}
```

### 📁 `services/` - Business Logic

**Purpose**: Contains the core business logic and service implementations.

```typescript
// services/user.service.ts
@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly roleService: RoleService
  ) {}

  async findAll(query: UserListDto): Promise<UserDoc[]> {
    const { search, page, perPage, orderBy, orderDirection } = query;

    const find: Record<string, any> = {};
    if (search) {
      find.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    return this.userRepository.findAll(find, {
      paging: {
        limit: perPage,
        offset: (page - 1) * perPage,
      },
      order: {
        [orderBy]: orderDirection,
      },
      join: {
        path: 'role',
        select: 'name type',
      },
    });
  }

  async findOneById(id: string): Promise<UserDoc> {
    const user = await this.userRepository.findOneById(id, {
      join: {
        path: 'role',
        select: 'name type permissions',
      },
    });

    if (!user) {
      throw new UserNotFoundError(id);
    }

    return user;
  }

  async create(data: UserCreateDto): Promise<UserDoc> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOneByEmail(data.email);
    if (existingUser) {
      throw new UserEmailAlreadyExistsError();
    }

    // Create password hash
    const password = await this.authService.createPassword(data.password);

    // Get default role
    const role = await this.roleService.findOneByName('user');

    // Create user entity
    const userData: UserEntity = {
      ...data,
      email: data.email.toLowerCase(),
      password: password.passwordHash,
      salt: password.salt,
      role: role._id,
      signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
      signUpDate: new Date(),
      isActive: true,
    };

    return this.userRepository.create(userData);
  }

  async update(id: string, data: UserUpdateDto): Promise<UserDoc> {
    const user = await this.findOneById(id);

    // If email is being updated, check uniqueness
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findOneByEmail(data.email);
      if (existingUser) {
        throw new UserEmailAlreadyExistsError();
      }
    }

    return this.userRepository.updateOneById(id, data);
  }
}
```

### 📁 `tasks/` - Scheduled Tasks

**Purpose**: Cron jobs and scheduled tasks specific to the module.

```typescript
// tasks/user.cleanup.task.ts
@Injectable()
export class UserCleanupTask {
  private readonly logger = new Logger(UserCleanupTask.name);

  constructor(private readonly userService: UserService) {}

  @Cron('0 0 * * *') // Daily at midnight
  async cleanupInactiveUsers(): Promise<void> {
    this.logger.log('Starting user cleanup task...');

    try {
      // Find users inactive for more than 365 days
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 365);

      const inactiveUsers = await this.userService.findInactiveUsers(cutoffDate);

      for (const user of inactiveUsers) {
        await this.userService.archiveUser(user._id);
        this.logger.log(`Archived inactive user: ${user.email}`);
      }

      this.logger.log(`User cleanup completed. Archived ${inactiveUsers.length} users.`);
    } catch (error) {
      this.logger.error('User cleanup task failed:', error);
    }
  }
}
```

### 📄 `[module-name].module.ts` - Module Configuration

**Purpose**: Main module file that wires everything together.

```typescript
// user.module.ts
@Module({
  imports: [
    UserRepositoryModule,
    RoleModule,
    AuthModule,
  ],
  providers: [
    UserService,
    UserFactory,
    UserCleanupTask,
  ],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
```

## Implementation Examples

### Example: User Module Structure

```
src/modules/user/
├── 📁 constants/
│   ├── user.enum.constant.ts       # User enums and status codes
│   └── user.constant.ts            # User default values
├── 📁 controllers/
│   ├── user.admin.controller.ts    # Admin user endpoints
│   ├── user.public.controller.ts   # Public user endpoints
│   └── user.user.controller.ts     # User-specific endpoints
├── 📁 decorators/
│   └── user.decorator.ts           # User-specific decorators
├── 📁 dtos/
│   ├── request/
│   │   ├── user.create.dto.ts      # User creation validation
│   │   ├── user.update.dto.ts      # User update validation
│   │   └── user.list.dto.ts        # User listing query
│   └── response/
│       └── user.response.dto.ts    # User response format
├── 📁 errors/
│   └── user.error.ts               # Custom user errors
├── 📁 guards/
│   └── user.can-update.guard.ts    # User update authorization
├── 📁 interfaces/
│   └── user.interface.ts           # User type definitions
├── 📁 repository/
│   ├── entities/
│   │   └── user.entity.ts          # User database entity
│   ├── repositories/
│   │   └── user.repository.ts      # User data access
│   └── user.repository.module.ts   # Repository module
├── 📁 serializations/
│   ├── user.get.serialization.ts   # User response serialization
│   └── user.list.serialization.ts  # User list serialization
├── 📁 services/
│   └── user.service.ts              # User business logic
└── user.module.ts                   # Main user module
```

## Best Practices

### 1. Naming Conventions

```typescript
// ✅ Good naming patterns
user.controller.ts          // Controller files
user.service.ts            // Service files
user.entity.ts             // Entity files
user.dto.ts               // DTO files
user.interface.ts         // Interface files
UserController            // Class names (PascalCase)
userService              // Variable names (camelCase)
USER_MAX_ATTEMPTS        // Constants (SCREAMING_SNAKE_CASE)

// ❌ Bad naming patterns
UserController.ts        // Wrong file naming
userservice.ts          // Missing dots
user_controller.ts      // Underscores in filenames
```

### 2. Import Organization

```typescript
// ✅ Good import organization
// 1. Node.js modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// 2. External libraries
import { Model } from 'mongoose';

// 3. Internal imports - common
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';

// 4. Internal imports - same module
import { UserEntity, UserDoc } from '../entities/user.entity';

// ❌ Bad import organization
import { UserEntity, UserDoc } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
```

### 3. File Structure Consistency

```typescript
// ✅ Consistent file structure
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}

  // Public methods first
  async findAll(): Promise<UserDoc[]> { /* ... */ }

  async findOneById(id: string): Promise<UserDoc> { /* ... */ }

  // Private methods last
  private validateUserData(data: any): boolean { /* ... */ }
}
```

### 4. Error Handling Patterns

```typescript
// ✅ Consistent error handling
async findOneById(id: string): Promise<UserDoc> {
  const user = await this.userRepository.findOneById(id);

  if (!user) {
    throw new UserNotFoundError(id);
  }

  return user;
}

// ❌ Inconsistent error handling
async findOneById(id: string): Promise<UserDoc> {
  const user = await this.userRepository.findOneById(id);

  if (!user) {
    throw new Error('User not found'); // Generic error
  }

  return user;
}
```

## Creating a New Module

### Step 1: Create Directory Structure

```bash
# Create main module directory
mkdir src/modules/new-feature

# Create subdirectories
cd src/modules/new-feature
mkdir constants controllers dtos interfaces repository services
mkdir repository/entities repository/repositories
mkdir serializations guards decorators
```

### Step 2: Create Basic Files

```bash
# Create main module file
touch new-feature.module.ts

# Create basic service and controller
touch services/new-feature.service.ts
touch controllers/new-feature.controller.ts

# Create repository files
touch repository/entities/new-feature.entity.ts
touch repository/repositories/new-feature.repository.ts
touch repository/new-feature.repository.module.ts
```

### Step 3: Implement Core Components

1. **Entity Definition**
2. **Repository Implementation**
3. **Service Implementation**
4. **Controller Implementation**
5. **Module Configuration**

### Step 4: Add to Application

```typescript
// In app.module.ts
import { NewFeatureModule } from './modules/new-feature/new-feature.module';

@Module({
  imports: [
    // ... other modules
    NewFeatureModule,
  ],
})
export class AppModule {}
```

## Common Patterns

### Repository Pattern

```typescript
@Injectable()
export class FeatureRepository extends DatabaseMongoObjectIdRepositoryAbstract<
  FeatureDoc,
  FeatureEntity
> {
  constructor(
    @InjectModel(FeatureEntity.name)
    private readonly featureModel: Model<FeatureDoc>
  ) {
    super(featureModel);
  }

  // Custom repository methods
  async findByStatus(status: string): Promise<FeatureDoc[]> {
    return this.featureModel.find({ status });
  }
}
```

### Service Pattern

```typescript
@Injectable()
export class FeatureService {
  constructor(
    private readonly featureRepository: FeatureRepository,
    private readonly messageService: MessageService
  ) {}

  async findAll(query: FeatureListDto): Promise<FeatureDoc[]> {
    // Business logic implementation
  }
}
```

### Controller Pattern

```typescript
@Controller()
export class FeatureController {
  constructor(
    private readonly featureService: FeatureService,
    private readonly messageService: MessageService
  ) {}

  @Get()
  async list(): Promise<IResponse> {
    const data = await this.featureService.findAll();
    return {
      data,
      message: this.messageService.get('feature.list'),
    };
  }
}
```

This module structure guide ensures consistency across all feature modules in the AIN-NestJS application, making the codebase maintainable and scalable.