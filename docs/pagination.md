# Pagination

This document explains how server-side pagination works in the AIN-NestJS application, including query decorators, response formatting, and filtering capabilities.

## Prerequisites

Before starting, you can read some docs for better understanding:
1. [Structure Response][doc-structure-response] 
2. [Response][doc-response] 

## Purpose

The pagination system provides:

- **Server-side pagination** with configurable limits and offsets
- **Advanced filtering** with multiple data types and operators
- **Search functionality** across multiple fields
- **Sorting and ordering** with validation
- **Response standardization** with metadata and serialization
- **Type-safe query handling** with automatic validation

## Description

The application implements a comprehensive server-side pagination system with two main components:

### 1. `@PaginationQuery` Decorators

These decorators automatically convert HTTP query parameters into database query objects:

- **`@PaginationQuery`** - Core pagination (search, paging, ordering)
- **`@PaginationQueryFilterInBoolean`** - Boolean array filtering
- **`@PaginationQueryFilterInEnum`** - Enum value filtering
- **`@PaginationQueryFilterEqual`** - Exact string matching
- **`@PaginationQueryFilterContain`** - String contains filtering
- **`@PaginationQueryFilterDate`** - Date range filtering
- **`@PaginationQueryFilterEqualObjectId`** - MongoDB ObjectId filtering

### 2. `@ResponsePaging` Decorator

This decorator extends the standard `@Response` decorator with pagination-specific features:

- **Required serialization** for consistent data formatting
- **Automatic pagination metadata** generation
- **Standardized response structure** with `IResponsePaging` interface
- **Built-in total count and page calculation**

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   HTTP Query    │    │   Pagination     │    │   Database      │
│   Parameters    │───▶│   Pipes &        │───▶│   Query         │
│                 │    │   Decorators     │    │   Execution     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Response       │    │   Serialized    │
                       │   Formatting     │    │   Data          │
                       └──────────────────┘    └─────────────────┘
```

---

# PaginationQuery Decorators

The pagination system uses a combination of decorators to handle different types of query parameters. Each decorator automatically validates, transforms, and converts query parameters into database query objects.

## Supported Query Parameters

The pagination system automatically handles these query parameters:

- **`search`** - Text searching across specified fields
- **`perPage`** - Number of items per page (limited by max value)
- **`page`** - Current page number (1-based)
- **`orderBy`** - Field name for sorting
- **`orderDirection`** - Sort direction (asc/desc)

## Core Pagination Decorator

### `@PaginationQuery`

The core pagination decorator that handles search, paging, and ordering. This decorator is required for all paginated endpoints.

```typescript
export function PaginationQuery(
  defaultPerPage: number,
  defaultOrderBy: string,
  defaultOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
  availableSearch: string[],
  availableOrderBy: string[]
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `defaultPerPage` | `number` | Default number of items per page | `20` |
| `defaultOrderBy` | `string` | Default field for sorting | `'createdAt'` |
| `defaultOrderDirection` | `ENUM_PAGINATION_ORDER_DIRECTION_TYPE` | Default sort direction | `ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC` |
| `availableSearch` | `string[]` | Fields that can be searched | `['name', 'email']` |
| `availableOrderBy` | `string[]` | Fields that can be used for sorting | `['createdAt', 'name', 'email']` |

#### Configuration Constants

```typescript
// Default pagination constants
export const PAGINATION_PER_PAGE = 20
export const PAGINATION_MAX_PER_PAGE = 100
export const PAGINATION_PAGE = 1
export const PAGINATION_MAX_PAGE = 20
export const PAGINATION_ORDER_BY = 'createdAt'
export const PAGINATION_ORDER_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
export const PAGINATION_AVAILABLE_ORDER_BY = ['createdAt']
export const PAGINATION_AVAILABLE_ORDER_DIRECTION = [ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC, ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC]
```

#### Usage Example

```typescript
// Define pagination constants for a module
const USER_DEFAULT_PER_PAGE = 20
const USER_DEFAULT_ORDER_BY = 'createdAt'
const USER_DEFAULT_ORDER_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC
const USER_DEFAULT_AVAILABLE_SEARCH = ['firstName', 'lastName', 'email']
const USER_DEFAULT_AVAILABLE_ORDER_BY = ['createdAt', 'firstName', 'lastName', 'email']

@Get('/list')
async list(
  @PaginationQuery(
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_AVAILABLE_ORDER_BY
  )
  { _search, _limit, _offset, _order }: PaginationListDto
): Promise<IResponsePaging> {
  // Implementation
}
```

## Filter Decorators

The pagination system includes several specialized filter decorators for different data types and query operations.

### `@PaginationQueryFilterInBoolean`

Filters data based on boolean values. Returns documents where the field matches any value in the provided boolean array.

```typescript
export function PaginationQueryFilterInBoolean(
  field: string,
  defaultValue: boolean[],
  queryField?: string,
  raw = false
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `field` | `string` | Query parameter name | `'isActive'` |
| `defaultValue` | `boolean[]` | Default values when no query provided | `[true, false]` |
| `queryField` | `string` | Database field name (optional) | `'isActive'` |
| `raw` | `boolean` | Return raw array instead of query object | `false` |

#### Usage Example

```typescript
const USER_DEFAULT_IS_ACTIVE = [true, false]

@Get('/list')
async list(
  @PaginationQuery(...)
  { _search, _limit, _offset, _order }: PaginationListDto,
  @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
  isActive: Record<string, any>
): Promise<IResponsePaging> {
  const find: Record<string, any> = {
    ..._search,
    ...isActive, // { isActive: { $in: [true, false] } }
  }
  // Implementation
}
```

### `@PaginationQueryFilterInEnum`

Filters data based on enum values with validation against allowed enum values.

```typescript
export function PaginationQueryFilterInEnum<T>(
  field: string,
  defaultValue: T,
  defaultEnum: Record<string, any>,
  queryField?: string,
  raw = false
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `field` | `string` | Query parameter name | `'type'` |
| `defaultValue` | `T` | Default enum value | `'USER'` |
| `defaultEnum` | `Record<string, any>` | Enum object for validation | `ENUM_USER_TYPE` |
| `queryField` | `string` | Database field name (optional) | `'type'` |
| `raw` | `boolean` | Return raw value instead of query object | `false` |

#### Usage Example

```typescript
const TEMPLATE_DEFAULT_TYPE = 'RESUME'

@Get('/list')
async list(
  @PaginationQuery(...)
  { _search, _limit, _offset, _order }: PaginationListDto,
  @PaginationQueryFilterInEnum('type', TEMPLATE_DEFAULT_TYPE, ENUM_TEMPLATE_TYPE)
  type: Record<string, any>
): Promise<IResponsePaging> {
  const find: Record<string, any> = {
    ..._search,
    ...type, // { type: 'RESUME' }
  }
  // Implementation
}
```

### `@PaginationQueryFilterEqual`

Filters data with exact string matching.

```typescript
export function PaginationQueryFilterEqual(
  field: string,
  queryField?: string,
  options?: IPaginationFilterStringEqualOptions,
  raw = false
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `field` | `string` | Query parameter name | `'status'` |
| `queryField` | `string` | Database field name (optional) | `'status'` |
| `options` | `IPaginationFilterStringEqualOptions` | Additional filtering options | `{ case: 'insensitive' }` |
| `raw` | `boolean` | Return raw value instead of query object | `false` |

### `@PaginationQueryFilterContain`

Filters data with case-insensitive string contains matching.

```typescript
export function PaginationQueryFilterContain(
  field: string,
  queryField?: string,
  options?: IPaginationFilterStringContainOptions,
  raw = false
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `field` | `string` | Query parameter name | `'description'` |
| `queryField` | `string` | Database field name (optional) | `'description'` |
| `options` | `IPaginationFilterStringContainOptions` | Additional filtering options | `{ case: 'insensitive', fullMatch: false }` |
| `raw` | `boolean` | Return raw value instead of query object | `false` |

### `@PaginationQueryFilterDate`

Filters data based on date values.

```typescript
export function PaginationQueryFilterDate(
  field: string,
  queryField?: string,
  options?: IPaginationFilterDateOptions,
  raw = false
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `field` | `string` | Query parameter name | `'createdAt'` |
| `queryField` | `string` | Database field name (optional) | `'createdAt'` |
| `options` | `IPaginationFilterDateOptions` | Date filtering options | `{ time: 'startOfDay' }` |
| `raw` | `boolean` | Return raw value instead of query object | `false` |

### `@PaginationQueryFilterEqualObjectId`

Filters data based on MongoDB ObjectId values.

```typescript
export function PaginationQueryFilterEqualObjectId(
  field: string,
  queryField?: string,
  raw = false
): ParameterDecorator
```

#### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `field` | `string` | Query parameter name | `'role'` |
| `queryField` | `string` | Database field name (optional) | `'role'` |
| `raw` | `boolean` | Return raw value instead of query object | `false` |

#### Usage Example

```typescript
@Get('/list')
async list(
  @PaginationQuery(...)
  { _search, _limit, _offset, _order }: PaginationListDto,
  @PaginationQueryFilterEqualObjectId('role')
  role: Record<string, any>
): Promise<IResponsePaging> {
  const find: Record<string, any> = {
    ..._search,
    ...role, // { role: ObjectId('...') }
  }
  // Implementation
}
```

## How to Use

### Basic Implementation

Use pagination decorators as `ParameterDecorator` in your NestJS controllers:

```typescript
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paginationService: PaginationService
  ) {}

  @Get('/list')
  async list(
    @PaginationQuery(
      USER_DEFAULT_PER_PAGE,
      USER_DEFAULT_ORDER_BY,
      USER_DEFAULT_ORDER_DIRECTION,
      USER_DEFAULT_AVAILABLE_SEARCH,
      USER_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
    }

    const users = await this.userService.findAll(find, {
      paging: { limit: _limit, offset: _offset },
      order: _order,
    })

    const total = await this.userService.getTotal(find)
    const totalPage = this.paginationService.totalPage(total, _limit)

    return {
      data: users,
      _pagination: { total, totalPage },
    }
  }
}
```

### Advanced Implementation with Filters

```typescript
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paginationService: PaginationService
  ) {}

  @Get('/list')
  async list(
    @PaginationQuery(
      USER_DEFAULT_PER_PAGE,
      USER_DEFAULT_ORDER_BY,
      USER_DEFAULT_ORDER_DIRECTION,
      USER_DEFAULT_AVAILABLE_SEARCH,
      USER_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>,
    @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
    blocked: Record<string, any>,
    @PaginationQueryFilterEqualObjectId('role')
    role: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
      ...blocked,
      ...role,
    }

    const users = await this.userService.findAll(find, {
      paging: { limit: _limit, offset: _offset },
      order: _order,
    })

    const total = await this.userService.getTotal(find)
    const totalPage = this.paginationService.totalPage(total, _limit)

    return {
      data: users,
      _pagination: { total, totalPage },
    }
  }
}
```

## Real-World Examples

### Example 1: User Management with Filters

```typescript
// User pagination constants
const USER_DEFAULT_PER_PAGE = 20
const USER_DEFAULT_ORDER_BY = 'createdAt'
const USER_DEFAULT_ORDER_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC
const USER_DEFAULT_AVAILABLE_SEARCH = ['firstName', 'lastName', 'email']
const USER_DEFAULT_AVAILABLE_ORDER_BY = ['createdAt', 'firstName', 'lastName', 'email']
const USER_DEFAULT_IS_ACTIVE = [true, false]
const USER_DEFAULT_BLOCKED = [false]
const USER_DEFAULT_INACTIVE_PERMANENT = [false]

@Controller('/admin/user')
export class UserAdminController {
  constructor(
    private readonly userService: UserService,
    private readonly paginationService: PaginationService
  ) {}

  @ResponsePaging('user.list', {
    serialization: UserListSerialization,
  })
  @Get('/list')
  async list(
    @PaginationQuery(
      USER_DEFAULT_PER_PAGE,
      USER_DEFAULT_ORDER_BY,
      USER_DEFAULT_ORDER_DIRECTION,
      USER_DEFAULT_AVAILABLE_SEARCH,
      USER_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', USER_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>,
    @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
    blocked: Record<string, any>,
    @PaginationQueryFilterEqualObjectId('role')
    role: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
      ...blocked,
      ...role,
    }

    const users = await this.userService.findAll(find, {
      paging: { limit: _limit, offset: _offset },
      order: _order,
    })

    const total = await this.userService.getTotal(find)
    const totalPage = this.paginationService.totalPage(total, _limit)

    return {
      data: users,
      _pagination: { total, totalPage },
    }
  }
}
```

### Example 2: Template Listing with Enum Filter

```typescript
// Template pagination constants
const TEMPLATE_DEFAULT_PER_PAGE = 10
const TEMPLATE_DEFAULT_ORDER_BY = 'createdAt'
const TEMPLATE_DEFAULT_ORDER_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC
const TEMPLATE_DEFAULT_AVAILABLE_SEARCH = ['name', 'description']
const TEMPLATE_DEFAULT_AVAILABLE_ORDER_BY = ['createdAt', 'name']
const TEMPLATE_DEFAULT_IS_ACTIVE = [true]
const TEMPLATE_DEFAULT_TYPE = 'RESUME'

@Controller('/template')
export class TemplatePublicController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly paginationService: PaginationService
  ) {}

  @ResponsePaging('template.list', {
    serialization: TemplateListSerialization,
  })
  @Get('/')
  async list(
    @PaginationQuery(
      TEMPLATE_DEFAULT_PER_PAGE,
      TEMPLATE_DEFAULT_ORDER_BY,
      TEMPLATE_DEFAULT_ORDER_DIRECTION,
      TEMPLATE_DEFAULT_AVAILABLE_SEARCH,
      TEMPLATE_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @PaginationQueryFilterInBoolean('isActive', TEMPLATE_DEFAULT_IS_ACTIVE)
    isActive: Record<string, any>,
    @PaginationQueryFilterInEnum('type', TEMPLATE_DEFAULT_TYPE, ENUM_TEMPLATE_TYPE)
    type: Record<string, any>
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = {
      ..._search,
      ...isActive,
      ...type,
    }

    const templates = await this.templateService.findAll(find, {
      paging: { limit: _limit, offset: _offset },
      order: _order,
    })

    const total = await this.templateService.getTotal(find)
    const totalPage = this.paginationService.totalPage(total, _limit)

    return {
      data: templates,
      _pagination: { total, totalPage },
    }
  }
}
```

## Request/Response Examples

### Request Examples

```bash
# Basic pagination
GET /api/v1/admin/user/list

# With search and pagination
GET /api/v1/admin/user/list?search=john&perPage=10&page=2

# With filters
GET /api/v1/admin/user/list?isActive=true&blocked=false&role=64f8a1b2c3d4e5f6a7b8c9d0

# With ordering
GET /api/v1/admin/user/list?orderBy=firstName&orderDirection=asc

# Combined parameters
GET /api/v1/admin/user/list?search=john&perPage=5&page=1&isActive=true&orderBy=createdAt&orderDirection=desc
```

### Response Examples

#### Basic Response (No Query Parameters)

```json
{
  "statusCode": 200,
  "message": "user.list",
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1692031787997,
    "timezone": "Asia/Tehran",
    "requestId": "165b5484-4287-4812-94cd-33a79c67a0fa",
    "path": "/api/v1/admin/user/list",
    "version": "1",
    "repoVersion": "1.0.0",
    "pagination": {
      "search": "",
      "availableSearch": ["firstName", "lastName", "email"],
      "page": 1,
      "perPage": 20,
      "orderBy": "createdAt",
      "orderDirection": "desc",
      "availableOrderBy": ["createdAt", "firstName", "lastName", "email"],
      "availableOrderDirection": ["asc", "desc"],
      "total": 150,
      "totalPage": 8
    }
  },
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "isActive": true,
      "blocked": false,
      "createdAt": "2023-08-15T10:30:00.000Z"
    }
  ]
}
```

#### Response with Search and Filters

```json
{
  "statusCode": 200,
  "message": "user.list",
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1692031787997,
    "timezone": "Asia/Tehran",
    "requestId": "165b5484-4287-4812-94cd-33a79c67a0fa",
    "path": "/api/v1/admin/user/list",
    "version": "1",
    "repoVersion": "1.0.0",
    "pagination": {
      "search": "john",
      "availableSearch": ["firstName", "lastName", "email"],
      "page": 2,
      "perPage": 10,
      "orderBy": "createdAt",
      "orderDirection": "desc",
      "availableOrderBy": ["createdAt", "firstName", "lastName", "email"],
      "availableOrderDirection": ["asc", "desc"],
      "total": 25,
      "totalPage": 3
    }
  },
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "isActive": true,
      "blocked": false,
      "createdAt": "2023-08-14T15:20:00.000Z"
    }
  ]
}
```

--- 

# ResponsePaging Decorator

The `@ResponsePaging` decorator extends the standard `@Response` decorator with pagination-specific features. It automatically handles response formatting, metadata generation, and serialization for paginated endpoints.

## Params and Options

`@ResponsePaging` also has a parameter and options, so you can use it based on a scenario.

```ts
export function ResponsePaging<T>(
    messagePath: string,
    options?: IResponsePagingOptions<T>
): MethodDecorator {
    ...
    ...
    ...
}
```

### messagePath

> inherited [response][doc-response]

### options

Has an interface as `IResponsePagingOptions`.

```ts
export type IMessageOptionsProperties = Record<string, string | number>;

export interface IResponseOptions<T> {
    serialization?: ClassConstructor<T>;
    messageProperties?: IMessageOptionsProperties;
}

export interface IResponsePagingOptions<T>
    extends Omit<IResponseOptions<T>, 'serialization'> {
    serialization: ClassConstructor<T>;
}
```

Options is required and have 2 parameters. 

1. `serialization`: Serialize a response to some class.
2. `messageProperties`: If you have some custom properties in the language files, It will be useful when the message is used for 2, 3, or many `@ResponsePaging`.

## How to use

To use response decorator put `@ResponsePaging` in Controller level like this

```ts

@Controller()
export class Controller {

    @ResponsePaging('messagePath', {
        serialization: PaginationSerialization
    }) // <---- here
    @Get('/test')
    async test(
    ): Promise<IResponsePaging> { // <---- must return a response
        ...
    }

}

```

## Scenario

The scenario of `@ResponsePaging` is the same as `@Response` in [response][doc-response] but the structure will follow `IResponsePaging`.

### Scenario1
Return some data with `IResponsePaging` interface.


```ts
const TEST_DEFAULT_ORDER_BY = 'createdAt';
const TEST_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
const TEST_DEFAULT_PER_PAGE = 20;
const TEST_DEFAULT_AVAILABLE_ORDER_BY = ['createdAt'];
const TEST_DEFAULT_AVAILABLE_SEARCH = [];

class PaginationSerialization{
    @Type(() => String)
    test: string;
}

@Controller()
export class Controller {

    @ResponsePaging('messagePath', {
        serialization: PaginationSerialization
    }) // <---- here
    @Get('/test')
    async test(
        @PaginationQuery(
            TEST_DEFAULT_PER_PAGE,
            TEST_DEFAULT_ORDER_BY,
            TEST_DEFAULT_ORDER_DIRECTION,
            TEST_DEFAULT_AVAILABLE_SEARCH,
            TEST_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto, // <---- get PaginationQuery
    ): Promise<IResponsePaging> { // <---- must return a response
        const find: Record<string, any> = {
            ..._search,
        };

        // get data from testService
        const tests: TestEntity[] = await this.testService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });

        // get total data
        const total: number = await this.testService.getTotal(find);

        // calculate totalPage base on limit and total
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: tests,
        };
    }

}

```

The response data will convert testNumber into number, and add addValue automatically.
```json
{
    "statusCode": 200,
    "message": "messagePath",
    "_metadata": {
        "languages": [
            "en"
        ],
        "timestamp": 1692031787997,
        "timezone": "Asia/Jakarta",
        "requestId": "165b5484-4287-4812-94cd-33a79c67a0fa",
        "path": "/api/v1/test",
        "version": "1",
        "repoVersion": "1.0.0",
        "pagination": {
            "search": "",
            "availableSearch": [],
            "page": 1,
            "perPage": 20,
            "orderBy": "createdAt",
            "orderDirection": "asc",
            "availableOrderBy": [
                "createdAt"
            ],
            "availableOrderDirection": [
                "asc",
                "desc"
            ],
            "total": 2,
            "totalPage": 1
        }
    },
    "data": [
        {
            "test": "1"
        },
        {
            "test": "2"
        }
    ]
}
```

## Conclusion

The pagination system in AIN-NestJS provides a comprehensive solution for server-side pagination with:

- **Automatic query parameter handling** with validation
- **Multiple filter types** for different data scenarios
- **Standardized response formatting** with metadata
- **Type-safe implementation** with TypeScript
- **Flexible configuration** for different use cases
- **Built-in security** with authorization integration

This system ensures consistent, efficient, and secure pagination across all endpoints while maintaining code reusability and maintainability.

---

## Documentation References

- [Structure Response Documentation][doc-structure-response]
- [Structure Module Documentation][doc-structure-module]
- [Structure Folder Documentation][doc-structure-folder]