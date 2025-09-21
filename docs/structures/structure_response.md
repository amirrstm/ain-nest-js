# Response Structure Guide

This document provides a comprehensive guide to the standardized response structure used throughout the AIN-NestJS API. Understanding this structure is essential for frontend developers and API integrators.

## Table of Contents

- [Overview](#overview)
- [Response Types](#response-types)
- [Metadata System](#metadata-system)
- [Pagination Structure](#pagination-structure)
- [Error Response Format](#error-response-format)
- [Serialization Classes](#serialization-classes)
- [Implementation Examples](#implementation-examples)
- [Best Practices](#best-practices)

## Overview

AIN-NestJS implements a consistent, structured response format across all API endpoints. This standardization provides:

- **Predictable Structure**: All responses follow the same format
- **Rich Metadata**: Additional information about request context
- **Consistent Pagination**: Standardized pagination across all list endpoints
- **Error Handling**: Structured error responses with detailed information
- **Internationalization**: Multi-language support in responses

### Core Response Principles

- **Consistency**: Every response follows the same structure
- **Completeness**: Responses include all necessary metadata
- **Flexibility**: Structure accommodates various data types and scenarios
- **Developer-Friendly**: Easy to parse and understand

## Response Types

### 1. Standard Response Structure

```typescript
interface IResponse {
  statusCode: number;                    // HTTP status code
  message: string;                       // Localized message
  data?: any;                           // Response data (optional)
  _metadata: ResponseMetadataSerialization; // Request metadata
}
```

### 2. Paginated Response Structure

```typescript
interface IPaginatedResponse {
  statusCode: number;                    // HTTP status code
  message: string;                       // Localized message
  data: any[];                          // Array of response data
  _pagination: ResponsePaginationSerialization; // Pagination info
  _metadata: ResponsePagingMetadataSerialization; // Enhanced metadata
}
```

### 3. Error Response Structure

```typescript
interface IErrorResponse {
  statusCode: number;                    // HTTP error status code
  message: string;                       // Localized error message
  errors?: IErrors[];                   // Detailed error information
  _metadata: ResponseMetadataSerialization; // Request metadata
}
```

## Metadata System

### ResponseMetadataSerialization

The metadata system provides contextual information about each request and response:

```typescript
export class ResponseMetadataSerialization {
  @ApiProperty({
    description: 'Supported languages for this request',
    example: ['en', 'fa'],
    type: [String]
  })
  languages: string[];

  @ApiProperty({
    description: 'Request timestamp (Unix timestamp)',
    example: 1634567890123
  })
  timestamp: number;

  @ApiProperty({
    description: 'Server timezone',
    example: 'Asia/Tehran'
  })
  timezone: string;

  @ApiProperty({
    description: 'Unique request identifier',
    example: 'req_123456789'
  })
  requestId: string;

  @ApiProperty({
    description: 'API endpoint path',
    example: '/api/v1/user/profile'
  })
  path: string;

  @ApiProperty({
    description: 'API version',
    example: '1'
  })
  version: string;

  @ApiProperty({
    description: 'Repository version/git commit',
    example: 'v5.6.6'
  })
  repoVersion: string;

  // Extensible for additional metadata
  [key: string]: any;
}
```

### Metadata Usage Examples

```typescript
// Example metadata in response
{
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": { /* user data */ },
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1634567890123,
    "timezone": "Asia/Tehran",
    "requestId": "req_abc123",
    "path": "/api/v1/user/profile",
    "version": "1",
    "repoVersion": "v5.6.6"
  }
}
```

## Pagination Structure

### Request Pagination Parameters

```typescript
export class RequestPaginationSerialization {
  @ApiProperty({
    description: 'Search query string',
    example: 'john doe',
    required: false
  })
  search: string;

  @ApiProperty({
    description: 'Filters applied to the query',
    example: { status: 'active', role: 'user' },
    required: false
  })
  filters: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >;

  @ApiProperty({
    description: 'Current page number (1-based)',
    example: 1,
    minimum: 1
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 20,
    minimum: 1,
    maximum: 100
  })
  perPage: number;

  @ApiProperty({
    description: 'Field to order by',
    example: 'createdAt'
  })
  orderBy: string;

  @ApiProperty({
    description: 'Order direction',
    example: 'desc',
    enum: ENUM_PAGINATION_ORDER_DIRECTION_TYPE
  })
  orderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE;

  @ApiProperty({
    description: 'Available fields for searching',
    example: ['firstName', 'lastName', 'email'],
    type: [String]
  })
  availableSearch: string[];

  @ApiProperty({
    description: 'Available fields for ordering',
    example: ['createdAt', 'updatedAt', 'name'],
    type: [String]
  })
  availableOrderBy: string[];

  @ApiProperty({
    description: 'Available order directions',
    example: ['asc', 'desc'],
    enum: ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
    isArray: true
  })
  availableOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE[];
}
```

### Response Pagination Information

```typescript
export class ResponsePaginationSerialization extends RequestPaginationSerialization {
  @ApiProperty({
    description: 'Total number of items',
    example: 150
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 8
  })
  totalPage: number;
}
```

### Cursor-Based Pagination

```typescript
export class ResponsePaginationCursorSerialization {
  @ApiProperty({
    description: 'URL for next page',
    example: '/api/v1/users?page=3&perPage=20',
    nullable: true
  })
  nextPage: string;

  @ApiProperty({
    description: 'URL for previous page',
    example: '/api/v1/users?page=1&perPage=20',
    nullable: true
  })
  previousPage: string;

  @ApiProperty({
    description: 'URL for first page',
    example: '/api/v1/users?page=1&perPage=20'
  })
  firstPage: string;

  @ApiProperty({
    description: 'URL for last page',
    example: '/api/v1/users?page=8&perPage=20'
  })
  lastPage: string;
}
```

### Complete Paginated Response Metadata

```typescript
export interface ResponsePagingMetadataSerialization
  extends ResponseMetadataSerialization {
  cursor: ResponsePaginationCursorSerialization;
  pagination: ResponsePaginationSerialization;
}
```

## Error Response Format

### Standard Error Structure

```typescript
export interface IErrors {
  readonly property: string;           // Field that caused the error
  readonly value: any;                // Invalid value that was provided
  readonly constraints: Record<string, string>; // Validation constraints
}

export interface IErrorsImport {
  readonly row: number;               // Row number in import file
  readonly property: string;          // Field that caused the error
  readonly value: any;               // Invalid value
  readonly constraints: Record<string, string>; // Validation constraints
}
```

### Error Response Examples

#### Validation Error

```json
{
  "statusCode": 422,
  "message": "Validation failed",
  "errors": [
    {
      "property": "email",
      "value": "invalid-email",
      "constraints": {
        "isEmail": "email must be a valid email address",
        "isNotEmpty": "email should not be empty"
      }
    },
    {
      "property": "password",
      "value": "123",
      "constraints": {
        "minLength": "password must be at least 8 characters long",
        "isStrongPassword": "password must contain uppercase, lowercase, number and symbol"
      }
    }
  ],
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1634567890123,
    "timezone": "Asia/Tehran",
    "requestId": "req_error_123",
    "path": "/api/v1/user/register",
    "version": "1",
    "repoVersion": "v5.6.6"
  }
}
```

#### Business Logic Error

```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1634567890123,
    "timezone": "Asia/Tehran",
    "requestId": "req_conflict_456",
    "path": "/api/v1/user/register",
    "version": "1",
    "repoVersion": "v5.6.6"
  }
}
```

## Serialization Classes

### Standard Response Serialization

```typescript
export class ResponseDefaultSerialization {
  @ApiProperty({
    description: 'HTTP status code',
    example: 200
  })
  statusCode: number;

  @ApiProperty({
    description: 'Response message (localized)',
    example: 'Operation completed successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Request metadata',
    type: () => ResponseMetadataSerialization
  })
  @Type(() => ResponseMetadataSerialization)
  _metadata: ResponseMetadataSerialization;

  @ApiProperty({
    description: 'Response data',
    required: false
  })
  data?: Record<string, any>;
}
```

### Paginated Response Serialization

```typescript
export class ResponsePagingSerialization {
  @ApiProperty({
    description: 'HTTP status code',
    example: 200
  })
  statusCode: number;

  @ApiProperty({
    description: 'Response message (localized)',
    example: 'Users retrieved successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Enhanced metadata with pagination info',
    type: () => ResponsePagingMetadataSerialization
  })
  @Type(() => ResponsePagingMetadataSerialization)
  _metadata: ResponsePagingMetadataSerialization;

  @ApiProperty({
    description: 'Array of response data',
    type: [Object]
  })
  data: Record<string, any>[];
}
```

## Implementation Examples

### 1. Standard Response Implementation

```typescript
// In a controller method
@Get('/profile')
@AuthJwtUserAccessProtected()
async getProfile(
  @AuthJwtPayload() payload: AuthAccessPayloadSerialization,
  @RequestCustomLang() customLang: string[]
): Promise<IResponse> {
  const user = await this.userService.findOneById(payload.user._id);

  return {
    statusCode: HttpStatus.OK,
    message: this.messageService.get('user.profile', { customLanguages: customLang }),
    data: this.responseService.serialization(user, UserGetSerialization),
  };
}

// Response output:
{
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "user",
      "type": "USER"
    },
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1634567890123,
    "timezone": "Asia/Tehran",
    "requestId": "req_abc123",
    "path": "/api/v1/user/profile",
    "version": "1",
    "repoVersion": "v5.6.6"
  }
}
```

### 2. Paginated Response Implementation

```typescript
// In a controller method
@Get('/list')
@AuthJwtAdminAccessProtected()
async list(
  @Query() query: UserListDto,
  @RequestCustomLang() customLang: string[]
): Promise<IResponsePaging> {
  const users = await this.userService.findAll(query);

  return {
    statusCode: HttpStatus.OK,
    message: this.messageService.get('user.list', { customLanguages: customLang }),
    data: this.responseService.serialization(users.data, UserListSerialization),
    _pagination: users.pagination,
  };
}

// Response output:
{
  "statusCode": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "createdAt": "2023-01-01T00:00:00.000Z"
    },
    // ... more users
  ],
  "_pagination": {
    "search": "",
    "filters": {},
    "page": 1,
    "perPage": 20,
    "orderBy": "createdAt",
    "orderDirection": "desc",
    "availableSearch": ["firstName", "lastName", "email"],
    "availableOrderBy": ["createdAt", "updatedAt", "firstName", "lastName"],
    "availableOrderDirection": ["asc", "desc"],
    "total": 150,
    "totalPage": 8
  },
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1634567890123,
    "timezone": "Asia/Tehran",
    "requestId": "req_list_789",
    "path": "/api/v1/admin/users",
    "version": "1",
    "repoVersion": "v5.6.6",
    "cursor": {
      "nextPage": "/api/v1/admin/users?page=2&perPage=20",
      "previousPage": null,
      "firstPage": "/api/v1/admin/users?page=1&perPage=20",
      "lastPage": "/api/v1/admin/users?page=8&perPage=20"
    }
  }
}
```

### 3. Error Response Implementation

```typescript
// In an exception filter or guard
try {
  await this.userService.create(createUserDto);
} catch (error) {
  if (error instanceof ConflictException) {
    throw new ConflictException({
      statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
      message: 'user.error.emailExist',
    });
  }
  throw error;
}

// Error response output:
{
  "statusCode": 409,
  "message": "Email already exists",
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1634567890123,
    "timezone": "Asia/Tehran",
    "requestId": "req_error_123",
    "path": "/api/v1/user/register",
    "version": "1",
    "repoVersion": "v5.6.6"
  }
}
```

### 4. Response Service Usage

```typescript
@Injectable()
export class ResponseService {
  serialization<T>(
    data: any,
    serialization: ClassConstructor<T>,
    options?: ClassTransformOptions
  ): T | T[] {
    return plainToClass(serialization, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      ...options,
    });
  }

  paging<T>(
    data: T[],
    pagination: ResponsePaginationSerialization
  ): IResponsePaging<T> {
    return {
      data,
      _pagination: pagination,
    };
  }
}
```

## Best Practices

### 1. Consistent Message Keys

```typescript
// ✅ Good: Use structured message keys
return {
  statusCode: HttpStatus.OK,
  message: this.messageService.get('user.profile.success', { customLanguages }),
  data: user,
};

// ❌ Bad: Use hardcoded messages
return {
  statusCode: HttpStatus.OK,
  message: 'User profile retrieved successfully',
  data: user,
};
```

### 2. Proper Data Serialization

```typescript
// ✅ Good: Use serialization classes
return {
  statusCode: HttpStatus.OK,
  message: this.messageService.get('user.create'),
  data: this.responseService.serialization(user, UserGetSerialization),
};

// ❌ Bad: Return raw database entities
return {
  statusCode: HttpStatus.OK,
  message: this.messageService.get('user.create'),
  data: user, // Contains sensitive fields like password
};
```

### 3. Meaningful Error Messages

```typescript
// ✅ Good: Structured error with context
throw new ConflictException({
  statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
  message: 'user.error.emailExist',
  data: { email: createUserDto.email },
});

// ❌ Bad: Generic error message
throw new ConflictException('Email already exists');
```

### 4. Pagination Consistency

```typescript
// ✅ Good: Always include pagination metadata
async findAll(query: UserListDto): Promise<IResponsePaging<UserDoc>> {
  const { data, pagination } = await this.userService.findAllWithPagination(query);

  return {
    statusCode: HttpStatus.OK,
    message: this.messageService.get('user.list'),
    data: this.responseService.serialization(data, UserListSerialization),
    _pagination: pagination,
  };
}
```

### 5. Response Type Definitions

```typescript
// ✅ Good: Define specific response types
interface IUserProfileResponse extends IResponse {
  data: UserGetSerialization;
}

interface IUserListResponse extends IResponsePaging {
  data: UserListSerialization[];
}

// Use in controller methods
async getProfile(): Promise<IUserProfileResponse> {
  // Implementation
}

async list(): Promise<IUserListResponse> {
  // Implementation
}
```

### 6. Metadata Enhancement

```typescript
// ✅ Good: Add relevant metadata for debugging
return {
  statusCode: HttpStatus.OK,
  message: this.messageService.get('ai.generation.success'),
  data: generatedResume,
  _metadata: {
    // Standard metadata is added automatically
    aiModel: 'gpt-3.5-turbo',
    tokensUsed: 1500,
    generationType: 'voice-to-resume',
  },
};
```

### 7. Error Context

```typescript
// ✅ Good: Include error context for debugging
try {
  await this.aiService.generateResume(audioFile);
} catch (error) {
  throw new InternalServerErrorException({
    statusCode: ENUM_AI_STATUS_CODE_ERROR.AI_GENERATION_FAILED,
    message: 'ai.error.generationFailed',
    _error: error.message,
    _context: {
      fileSize: audioFile.size,
      mimeType: audioFile.mimetype,
      duration: audioFile.duration,
    },
  });
}
```

This response structure guide ensures consistent, informative, and developer-friendly API responses across the entire AIN-NestJS application.