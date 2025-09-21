# Project Folder Structure Guide

This document provides a comprehensive guide to the AIN-NestJS project folder structure, explaining the purpose and organization of each directory to help developers navigate and contribute effectively.

## Table of Contents

- [Overview](#overview)
- [Root Directory Structure](#root-directory-structure)
- [Source Code Organization](#source-code-organization)
- [Detailed Directory Explanations](#detailed-directory-explanations)
- [Best Practices](#best-practices)
- [Adding New Features](#adding-new-features)

## Overview

AIN-NestJS follows a modular, domain-driven folder structure that promotes:

- **Separation of Concerns**: Each directory has a specific responsibility
- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Clear organization makes code easy to find and modify
- **Team Collaboration**: Consistent structure across all modules

## Root Directory Structure

```
AIN-NestJS/
├── 📁 .github/              # GitHub workflows and templates
├── 📁 .husky/               # Git hooks configuration
├── 📁 .vscode/              # VSCode workspace settings
├── 📁 ci/                   # CI/CD configuration files
├── 📁 data/                 # Static data files
├── 📁 docs/                 # Project documentation
├── 📁 public/               # Static assets
├── 📁 src/                  # Source code (main application)
├── 📁 test/                 # Test files and configurations
├── 📁 views/                # Template files for emails/reports
├── 📄 .dockerignore         # Docker ignore file
├── 📄 .env.example          # Environment variables template
├── 📄 .eslintrc             # ESLint configuration
├── 📄 .gitignore            # Git ignore file
├── 📄 .prettierrc           # Prettier configuration
├── 📄 docker-compose.yml    # Docker Compose configuration
├── 📄 Dockerfile            # Docker image configuration
├── 📄 nest-cli.json         # NestJS CLI configuration
├── 📄 package.json          # Node.js dependencies and scripts
├── 📄 README.md             # Project overview and setup
├── 📄 tsconfig.json         # TypeScript configuration
└── 📄 yarn.lock             # Yarn dependency lock file
```

## Source Code Organization

The `src/` directory contains the main application code organized as follows:

```
src/
├── 📁 app/                  # Application root module
├── 📁 common/               # Shared utilities and components
├── 📁 configs/              # Configuration modules
├── 📁 health/               # Health check endpoints
├── 📁 jobs/                 # Background jobs and cron tasks
├── 📁 languages/            # Internationalization files
├── 📁 migration/            # Database seeding and migration
├── 📁 modules/              # Feature modules (business logic)
├── 📁 router/               # API routing configuration
├── 📁 types/                # TypeScript type definitions
├── 📄 cli.ts                # Command-line interface
├── 📄 main.ts               # Application entry point
└── 📄 swagger.ts            # API documentation setup
```

## Detailed Directory Explanations

### 📁 `/app` - Application Root Module

**Purpose**: The final wrapper module that bootstraps the entire application.

```
app/
├── app.controller.ts        # Root controller (health checks, basic info)
├── app.module.ts           # Main application module
└── app.service.ts          # Root application service
```

**What it contains**:
- Application bootstrap logic
- Global module imports
- Basic health check endpoints
- Application-wide configuration

**When to modify**: Only when adding global modules or changing core application structure.

### 📁 `/common` - Shared Module

**Purpose**: Contains reusable components, utilities, and abstractions used across multiple modules.

```
common/
├── 📁 auth/                 # Authentication utilities
│   ├── decorators/          # Auth-related decorators
│   ├── guards/              # Authentication guards
│   └── strategies/          # Passport strategies
├── 📁 database/             # Database abstractions
│   ├── abstracts/           # Base repository classes
│   ├── decorators/          # Database decorators
│   └── interfaces/          # Database interfaces
├── 📁 decorators/           # Common decorators
├── 📁 error/                # Error handling utilities
├── 📁 file/                 # File handling utilities
├── 📁 helpers/              # Helper functions
├── 📁 interceptors/         # Request/response interceptors
├── 📁 message/              # Internationalization system
├── 📁 middleware/           # Custom middleware
├── 📁 pagination/           # Pagination utilities
├── 📁 pipes/                # Validation pipes
├── 📁 request/              # Request handling utilities
├── 📁 response/             # Response formatting
└── 📁 serializers/          # Data serialization
```

**Key Features**:
- **Reusability**: Components used across multiple modules
- **Abstraction**: Base classes and interfaces
- **Utilities**: Helper functions and common operations
- **Middleware**: Cross-cutting concerns

### 📁 `/configs` - Configuration Modules

**Purpose**: Centralized configuration management for different aspects of the application.

```
configs/
├── app.config.ts           # Application settings
├── auth.config.ts          # Authentication configuration
├── database.config.ts      # Database connection settings
├── file.config.ts          # File storage configuration
├── helper.config.ts        # Helper utilities config
├── message.config.ts       # Internationalization config
├── middleware.config.ts    # Middleware configuration
└── request.config.ts       # Request handling config
```

**Configuration Types**:
- **Environment-based**: Different settings for dev/staging/production
- **Service Integration**: External API configurations
- **Feature Toggles**: Enable/disable features
- **Performance Settings**: Timeouts, limits, caching

### 📁 `/health` - Health Check Module

**Purpose**: Provides health check endpoints for monitoring and load balancers.

```
health/
├── controllers/            # Health check controllers
├── indicators/             # Custom health indicators
├── serializations/         # Health response serializers
├── health.module.ts        # Health check module
└── interfaces/             # Health check interfaces
```

**Health Checks Include**:
- Database connectivity
- External service availability
- Memory and CPU usage
- Custom application metrics

### 📁 `/jobs` - Background Jobs

**Purpose**: Handles scheduled tasks, background processing, and cron jobs.

```
jobs/
├── decorators/             # Job-related decorators
├── interfaces/             # Job interfaces
├── services/               # Job execution services
└── jobs.module.ts          # Jobs module configuration
```

**Job Types**:
- **Scheduled Tasks**: Recurring operations
- **Background Processing**: Async operations
- **Data Cleanup**: Maintenance tasks
- **Report Generation**: Periodic reports

### 📁 `/languages` - Internationalization

**Purpose**: Contains translation files for multi-language support.

```
languages/
├── en/                     # English translations
│   ├── app.json
│   ├── auth.json
│   ├── user.json
│   └── ...
├── fa/                     # Persian translations
│   ├── app.json
│   ├── auth.json
│   ├── user.json
│   └── ...
└── id/                     # Indonesian translations
    ├── app.json
    └── ...
```

**Organization**:
- **By Language**: Each language has its own directory
- **By Feature**: Translation files organized by module
- **Nested Keys**: Hierarchical message organization

### 📁 `/migration` - Database Migration

**Purpose**: Handles database seeding, data migration, and rollback operations.

```
migration/
├── seeds/                  # Database seed files
├── commands/               # Migration commands
├── migration.module.ts     # Migration module
└── interfaces/             # Migration interfaces
```

**Migration Operations**:
- **Initial Setup**: Create default data
- **Data Seeding**: Add reference data
- **Schema Updates**: Database structure changes
- **Rollback**: Undo operations

### 📁 `/modules` - Feature Modules

**Purpose**: Contains all business logic modules, each representing a specific domain or feature.

```
modules/
├── category/               # Category management
├── category-request/       # Category request handling
├── chat/                   # AI chat functionality
├── data/                   # Data management
├── email/                  # Email services
├── history/                # Activity history
├── inputs/                 # Input handling
├── otp/                    # OTP verification
├── plan/                   # Subscription plans
├── prompts/                # AI prompts
├── resume/                 # Resume management
├── role/                   # User roles
├── setting/                # Application settings
├── template/               # Resume templates
├── user/                   # User management
└── user-plan/              # User subscription
```

**Each module follows the [Module Structure Guide](structure_module.md)**

### 📁 `/router` - API Routing

**Purpose**: Defines API routes and groups controllers by access level.

```
router/
├── router.admin.module.ts   # Admin routes
├── router.auth.module.ts    # Authentication routes
├── router.module.ts         # Main router module
├── router.public.module.ts  # Public routes
└── router.user.module.ts    # User routes
```

**Route Organization**:
- **By Access Level**: Admin, User, Public
- **By Authentication**: Authenticated vs Public
- **By Feature**: Grouped by functionality
- **Version Control**: API versioning support

### 📁 `/types` - Type Definitions

**Purpose**: Global TypeScript type definitions and interfaces.

```
types/
├── request.type.ts         # Request-related types
├── response.type.ts        # Response-related types
└── index.ts                # Type exports
```

## Best Practices

### 1. Module Organization

```typescript
// ✅ Good: Feature-based modules
modules/
├── user/
├── resume/
└── chat/

// ❌ Bad: Technical-based modules
modules/
├── controllers/
├── services/
└── repositories/
```

### 2. Import Organization

```typescript
// ✅ Good: Organized imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

// ❌ Bad: Mixed imports
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { ConfigService } from '@nestjs/config';
```

### 3. File Naming Conventions

```
✅ Good naming:
user.controller.ts
user.service.ts
user.entity.ts
user.dto.ts

❌ Bad naming:
UserController.ts
userService.ts
user_entity.ts
userDto.ts
```

### 4. Directory Structure Consistency

Each module should follow the same structure pattern:

```
module-name/
├── constants/
├── controllers/
├── dtos/
├── entities/
├── interfaces/
├── repositories/
├── serializations/
├── services/
└── module-name.module.ts
```

## Adding New Features

### Step 1: Create Module Directory

```bash
mkdir src/modules/new-feature
cd src/modules/new-feature
```

### Step 2: Create Module Structure

```bash
mkdir controllers dtos entities interfaces repositories serializations services constants
touch new-feature.module.ts
```

### Step 3: Implement Core Files

1. **Entity**: Define data model
2. **Repository**: Data access layer
3. **Service**: Business logic
4. **Controller**: API endpoints
5. **DTOs**: Request/response validation
6. **Module**: Wire everything together

### Step 4: Register Module

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

### Step 5: Add Routes (if needed)

```typescript
// In appropriate router module
import { NewFeatureController } from '../modules/new-feature/controllers/new-feature.controller';

@Module({
  controllers: [NewFeatureController],
})
export class RouterUserModule {}
```

## Common Patterns

### Configuration Pattern

```typescript
// configs/new-feature.config.ts
export default registerAs('newFeature', () => ({
  enabled: process.env.NEW_FEATURE_ENABLED === 'true',
  apiKey: process.env.NEW_FEATURE_API_KEY,
}));
```

### Service Pattern

```typescript
// modules/new-feature/services/new-feature.service.ts
@Injectable()
export class NewFeatureService {
  constructor(
    private readonly repository: NewFeatureRepository,
    private readonly configService: ConfigService
  ) {}
}
```

### Controller Pattern

```typescript
// modules/new-feature/controllers/new-feature.controller.ts
@Controller()
export class NewFeatureController {
  constructor(private readonly service: NewFeatureService) {}
}
```

This folder structure guide provides a solid foundation for understanding and working with the AIN-NestJS codebase. Following these conventions ensures consistency and maintainability across the project.