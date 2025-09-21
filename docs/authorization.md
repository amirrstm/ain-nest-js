# Authorization

This document explains how authorization and role-based access control (RBAC) works in the AIN-NestJS application, including role management, permissions, and access control.

## Prerequisites

- Understanding of Role-Based Access Control (RBAC)
- Knowledge of NestJS guards and decorators
- Basic understanding of policy-based authorization
- Familiarity with the authentication system

## Purpose

The authorization system provides:

- **Role-based access control** with hierarchical permissions
- **Policy-based authorization** for fine-grained access control
- **Guard-based protection** for routes and resources
- **Permission validation** for specific actions
- **Dynamic role assignment** and management
- **Multi-level access control** (Super Admin, Admin, User)

## Description

The application implements a comprehensive authorization system built on role-based access control with policy-based permissions. It supports:

- **Role Types**: SUPER_ADMIN, ADMIN, USER with hierarchical permissions
- **Permission System**: Fine-grained permissions based on subjects and actions
- **Guard System**: Multiple guards for different authorization scenarios
- **Dynamic Authorization**: Runtime permission checking and validation

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Request       │    │   Authorization  │    │   Role &        │
│   with JWT      │───▶│   Guards         │───▶│   Permission    │
│   Token         │    │                  │    │   Validation    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Role           │    │   Policy        │
                       │   Validation     │    │   Engine        │
                       └──────────────────┘    └─────────────────┘
```

## Role System

### 1. Role Types (`src/modules/role/constants/role.enum.constant.ts`)

```typescript
export enum ENUM_ROLE_TYPE {
  SUPER_ADMIN = 'SUPER_ADMIN',  // Highest level access
  USER = 'USER',                // Regular user access
  ADMIN = 'ADMIN',              // Administrative access
}
```

### 2. Role Entity (`src/modules/role/repository/entities/role.entity.ts`)

```typescript
@DatabaseEntity({ collection: RoleDatabaseName })
export class RoleEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 30,
    type: String,
  })
  name: string

  @Prop({
    required: false,
    trim: true,
    type: String,
  })
  description?: string

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean

  @Prop({
    required: true,
    enum: ENUM_ROLE_TYPE,
    index: true,
    type: String,
  })
  type: ENUM_ROLE_TYPE

  @Prop({
    required: true,
    default: [],
    _id: false,
    type: [
      {
        subject: {
          type: String,
          enum: ENUM_POLICY_SUBJECT,
          required: true,
        },
        action: {
          type: Array,
          required: true,
          default: [],
        },
      },
    ],
  })
  permissions: IPolicyRule[]
}
```

### 3. Policy Rules Interface

```typescript
export interface IPolicyRule {
  subject: ENUM_POLICY_SUBJECT    // Resource being accessed
  action: ENUM_POLICY_ACTION[]    // Actions allowed on the resource
}

export enum ENUM_POLICY_SUBJECT {
  USER = 'USER',
  ROLE = 'ROLE',
  SETTING = 'SETTING',
  // ... other subjects
}

export enum ENUM_POLICY_ACTION {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANAGE = 'MANAGE',
  // ... other actions
}
```

## Authorization Guards

### 1. Role Payload Type Guard

```typescript
@Injectable()
export class RolePayloadTypeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly helperArrayService: HelperArrayService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFor: ENUM_ROLE_TYPE[] = this.reflector.getAllAndOverride<ENUM_ROLE_TYPE[]>(ROLE_TYPE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    const { user } = context.switchToHttp().getRequest<IRequestApp>()
    const { type } = user.user

    // Super admin bypasses all role checks
    if (!requiredFor || type === ENUM_ROLE_TYPE.SUPER_ADMIN) {
      return true
    }

    const hasFor: boolean = this.helperArrayService.includes(requiredFor, type)

    if (!hasFor) {
      throw new ForbiddenException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_PAYLOAD_TYPE_INVALID_ERROR,
        message: 'role.error.typeForbidden',
      })
    }
    return hasFor
  }
}
```

### 2. Role Active Guard

```typescript
@Injectable()
export class RoleActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(ROLE_IS_ACTIVE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!required) {
      return true
    }

    const { __role } = context.switchToHttp().getRequest<IRequestApp & { __role: RoleDoc }>()

    if (!required.includes(__role.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_IS_ACTIVE_ERROR,
        message: 'role.error.isActiveInvalid',
      })
    }
    return true
  }
}
```

### 3. Role Not Found Guard

```typescript
@Injectable()
export class RoleNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __role } = context.switchToHttp().getRequest<IRequestApp & { __role: RoleDoc }>()

    if (!__role) {
      throw new NotFoundException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
        message: 'role.error.notFound',
      })
    }

    return true
  }
}
```

### 4. Role Put to Request Guard

```typescript
@Injectable()
export class RolePutToRequestGuard implements CanActivate {
  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __role: RoleDoc }>()
    const { params } = request
    const { role } = params

    const check: RoleDoc = await this.roleService.findOneById(role, {
      join: true,
    })
    request.__role = check

    return true
  }
}
```

## Authorization Decorators

### 1. JWT Authorization Decorators

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

// Admin role protection (Admin + Super Admin)
export function AuthJwtAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.SUPER_ADMIN, ENUM_ROLE_TYPE.ADMIN])
  )
}

// Super Admin only protection
export function AuthJwtSuperAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.SUPER_ADMIN])
  )
}
```

### 2. Role Management Decorators

```typescript
// Role admin get guard
export function RoleAdminGetGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(RolePutToRequestGuard, RoleNotFoundGuard, RoleActiveGuard),
    SetMetadata(ROLE_IS_ACTIVE_META_KEY, [true])
  )
}

// Role admin update guard
export function RoleAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(RolePutToRequestGuard, RoleNotFoundGuard, RoleActiveGuard),
    SetMetadata(ROLE_IS_ACTIVE_META_KEY, [true])
  )
}

// Role admin delete guard
export function RoleAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(RolePutToRequestGuard, RoleNotFoundGuard, RoleActiveGuard),
    SetMetadata(ROLE_IS_ACTIVE_META_KEY, [true])
  )
}
```

## Policy-Based Authorization

### 1. Policy Service Interface

```typescript
export interface IPolicyService {
  checkAbility(
    user: Record<string, any>,
    subject: ENUM_POLICY_SUBJECT,
    action: ENUM_POLICY_ACTION
  ): Promise<boolean>
  
  getAbilities(user: Record<string, any>): Promise<IPolicyRule[]>
  
  validatePolicy(
    user: Record<string, any>,
    subject: ENUM_POLICY_SUBJECT,
    action: ENUM_POLICY_ACTION
  ): Promise<boolean>
}
```

### 2. Policy Implementation

```typescript
@Injectable()
export class PolicyService implements IPolicyService {
  constructor(private readonly roleService: RoleService) {}

  async checkAbility(
    user: Record<string, any>,
    subject: ENUM_POLICY_SUBJECT,
    action: ENUM_POLICY_ACTION
  ): Promise<boolean> {
    const role = await this.roleService.findOneById(user.role)
    
    if (!role || !role.isActive) {
      return false
    }

    // Super admin has all permissions
    if (role.type === ENUM_ROLE_TYPE.SUPER_ADMIN) {
      return true
    }

    // Check specific permissions
    const hasPermission = role.permissions.some(permission => 
      permission.subject === subject && 
      permission.action.includes(action)
    )

    return hasPermission
  }

  async getAbilities(user: Record<string, any>): Promise<IPolicyRule[]> {
    const role = await this.roleService.findOneById(user.role)
    return role?.permissions || []
  }

  async validatePolicy(
    user: Record<string, any>,
    subject: ENUM_POLICY_SUBJECT,
    action: ENUM_POLICY_ACTION
  ): Promise<boolean> {
    const hasAbility = await this.checkAbility(user, subject, action)
    
    if (!hasAbility) {
      throw new ForbiddenException({
        statusCode: ENUM_POLICY_STATUS_CODE_ERROR.POLICY_ABILITY_ERROR,
        message: 'policy.error.abilityForbidden',
      })
    }
    
    return true
  }
}
```

## How to Use

### 1. Basic Role-Based Protection

```typescript
@Controller('/user')
export class UserController {
  @Get('/profile')
  @AuthJwtUserAccessProtected()  // Requires USER role or higher
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

  @Delete('/admin/users/:id')
  @AuthJwtSuperAdminAccessProtected()  // Requires SUPER_ADMIN role only
  async deleteUser(@Param('id') id: string): Promise<IResponse> {
    await this.userService.delete(id)
    return {
      message: 'user.delete',
    }
  }
}
```

### 2. Role Management

```typescript
@Controller('/admin/role')
export class RoleAdminController {
  constructor(
    private readonly roleService: RoleService,
    private readonly policyService: PolicyService
  ) {}

  @Get('/')
  @AuthJwtAdminAccessProtected()
  async findAll(): Promise<IResponse> {
    const roles = await this.roleService.findAll()
    return {
      data: roles,
      message: 'role.list',
    }
  }

  @Get('/:role')
  @RoleAdminGetGuard()  // Validates role exists and is active
  async findOne(@Param('role') role: string): Promise<IResponse> {
    const { __role } = this.request
    return {
      data: __role,
      message: 'role.get',
    }
  }

  @Post('/')
  @AuthJwtAdminAccessProtected()
  async create(@Body() body: RoleCreateDto): Promise<IResponse> {
    // Validate permissions before creating role
    await this.policyService.validatePolicy(
      this.user,
      ENUM_POLICY_SUBJECT.ROLE,
      ENUM_POLICY_ACTION.CREATE
    )

    const role = await this.roleService.create(body)
    return {
      data: role,
      message: 'role.create',
    }
  }

  @Put('/:role')
  @RoleAdminUpdateGuard()
  async update(
    @Param('role') role: string,
    @Body() body: RoleUpdateDto
  ): Promise<IResponse> {
    await this.policyService.validatePolicy(
      this.user,
      ENUM_POLICY_SUBJECT.ROLE,
      ENUM_POLICY_ACTION.UPDATE
    )

    const updatedRole = await this.roleService.update(role, body)
    return {
      data: updatedRole,
      message: 'role.update',
    }
  }
}
```

### 3. Policy-Based Authorization

```typescript
@Controller('/admin/setting')
export class SettingAdminController {
  constructor(private readonly policyService: PolicyService) {}

  @Get('/')
  @AuthJwtAdminAccessProtected()
  async findAll(@AuthJwtPayload() payload: AuthAccessPayloadSerialization): Promise<IResponse> {
    // Check if user has permission to read settings
    await this.policyService.validatePolicy(
      payload.user,
      ENUM_POLICY_SUBJECT.SETTING,
      ENUM_POLICY_ACTION.READ
    )

    const settings = await this.settingService.findAll()
    return {
      data: settings,
      message: 'setting.list',
    }
  }

  @Put('/:id')
  @AuthJwtAdminAccessProtected()
  async update(
    @Param('id') id: string,
    @Body() body: SettingUpdateDto,
    @AuthJwtPayload() payload: AuthAccessPayloadSerialization
  ): Promise<IResponse> {
    // Check if user has permission to update settings
    await this.policyService.validatePolicy(
      payload.user,
      ENUM_POLICY_SUBJECT.SETTING,
      ENUM_POLICY_ACTION.UPDATE
    )

    const setting = await this.settingService.update(id, body)
    return {
      data: setting,
      message: 'setting.update',
    }
  }
}
```

### 4. Dynamic Permission Checking

```typescript
@Injectable()
export class UserService {
  constructor(private readonly policyService: PolicyService) {}

  async findAll(user: Record<string, any>): Promise<UserDoc[]> {
    // Check if user can read other users
    const canReadUsers = await this.policyService.checkAbility(
      user,
      ENUM_POLICY_SUBJECT.USER,
      ENUM_POLICY_ACTION.READ
    )

    if (!canReadUsers) {
      throw new ForbiddenException({
        statusCode: ENUM_POLICY_STATUS_CODE_ERROR.POLICY_ABILITY_ERROR,
        message: 'policy.error.abilityForbidden',
      })
    }

    return this.userRepository.findAll()
  }

  async create(user: Record<string, any>, data: UserCreateDto): Promise<UserDoc> {
    // Check if user can create other users
    await this.policyService.validatePolicy(
      user,
      ENUM_POLICY_SUBJECT.USER,
      ENUM_POLICY_ACTION.CREATE
    )

    return this.userRepository.create(data)
  }
}
```

### 5. Role Assignment and Management

```typescript
@Controller('/admin/user')
export class UserAdminController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly policyService: PolicyService
  ) {}

  @Put('/:id/role')
  @AuthJwtAdminAccessProtected()
  async assignRole(
    @Param('id') userId: string,
    @Body() { roleId }: { roleId: string },
    @AuthJwtPayload() payload: AuthAccessPayloadSerialization
  ): Promise<IResponse> {
    // Check if current user can manage user roles
    await this.policyService.validatePolicy(
      payload.user,
      ENUM_POLICY_SUBJECT.USER,
      ENUM_POLICY_ACTION.UPDATE
    )

    // Validate the role exists and is active
    const role = await this.roleService.findOneById(roleId)
    if (!role || !role.isActive) {
      throw new BadRequestException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_IS_ACTIVE_ERROR,
        message: 'role.error.isActiveInvalid',
      })
    }

    // Update user role
    const user = await this.userService.update(userId, { role: roleId })
    return {
      data: user,
      message: 'user.update',
    }
  }

  @Get('/abilities')
  @AuthJwtAccessProtected()
  async getUserAbilities(@AuthJwtPayload() payload: AuthAccessPayloadSerialization): Promise<IResponse> {
    const abilities = await this.policyService.getAbilities(payload.user)
    return {
      data: abilities,
      message: 'policy.abilities',
    }
  }
}
```

## Role Hierarchy and Permissions

### 1. Default Role Permissions

```typescript
// Super Admin - Full access to everything
const superAdminPermissions: IPolicyRule[] = [
  { subject: ENUM_POLICY_SUBJECT.USER, action: [ENUM_POLICY_ACTION.MANAGE] },
  { subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.MANAGE] },
  { subject: ENUM_POLICY_SUBJECT.SETTING, action: [ENUM_POLICY_ACTION.MANAGE] },
  // ... all other subjects with MANAGE action
]

// Admin - Administrative access
const adminPermissions: IPolicyRule[] = [
  { subject: ENUM_POLICY_SUBJECT.USER, action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE] },
  { subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] },
  { subject: ENUM_POLICY_SUBJECT.SETTING, action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE] },
]

// User - Limited access
const userPermissions: IPolicyRule[] = [
  { subject: ENUM_POLICY_SUBJECT.USER, action: [ENUM_POLICY_ACTION.READ] }, // Only own profile
  { subject: ENUM_POLICY_SUBJECT.SETTING, action: [ENUM_POLICY_ACTION.READ] }, // Only public settings
]
```

### 2. Permission Inheritance

```typescript
@Injectable()
export class PolicyService {
  async checkAbility(
    user: Record<string, any>,
    subject: ENUM_POLICY_SUBJECT,
    action: ENUM_POLICY_ACTION
  ): Promise<boolean> {
    const role = await this.roleService.findOneById(user.role)
    
    // Super admin bypass
    if (role.type === ENUM_ROLE_TYPE.SUPER_ADMIN) {
      return true
    }

    // Check MANAGE permission (includes all other actions)
    const hasManagePermission = role.permissions.some(permission => 
      permission.subject === subject && 
      permission.action.includes(ENUM_POLICY_ACTION.MANAGE)
    )

    if (hasManagePermission) {
      return true
    }

    // Check specific action permission
    const hasSpecificPermission = role.permissions.some(permission => 
      permission.subject === subject && 
      permission.action.includes(action)
    )

    return hasSpecificPermission
  }
}
```

## Params and Options

### Authorization Options

```typescript
export interface IAuthPayloadOptions {
  readonly loginFrom: ENUM_AUTH_LOGIN_FROM
  readonly loginWith: ENUM_AUTH_LOGIN_WITH
  readonly loginDate: Date
}

export interface IPolicyRule {
  readonly subject: ENUM_POLICY_SUBJECT
  readonly action: ENUM_POLICY_ACTION[]
}
```

### Role Configuration

```typescript
export interface IRoleCreateDto {
  readonly name: string
  readonly description?: string
  readonly type: ENUM_ROLE_TYPE
  readonly permissions: IPolicyRule[]
  readonly isActive?: boolean
}
```

## Best Practices

### 1. Role Design

```typescript
// Create roles with minimal necessary permissions
const userRole = await this.roleService.create({
  name: 'user',
  description: 'Regular user with basic access',
  type: ENUM_ROLE_TYPE.USER,
  permissions: [
    { subject: ENUM_POLICY_SUBJECT.USER, action: [ENUM_POLICY_ACTION.READ] },
  ],
  isActive: true,
})

// Use MANAGE action sparingly
const adminRole = await this.roleService.create({
  name: 'admin',
  description: 'Administrator with management access',
  type: ENUM_ROLE_TYPE.ADMIN,
  permissions: [
    { subject: ENUM_POLICY_SUBJECT.USER, action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.UPDATE] },
    { subject: ENUM_POLICY_SUBJECT.ROLE, action: [ENUM_POLICY_ACTION.READ] },
  ],
  isActive: true,
})
```

### 2. Permission Checking

```typescript
// Always check permissions before sensitive operations
async deleteUser(userId: string, currentUser: Record<string, any>): Promise<void> {
  await this.policyService.validatePolicy(
    currentUser,
    ENUM_POLICY_SUBJECT.USER,
    ENUM_POLICY_ACTION.DELETE
  )

  // Additional business logic checks
  if (currentUser._id === userId) {
    throw new BadRequestException('Cannot delete own account')
  }

  await this.userRepository.delete(userId)
}
```

### 3. Error Handling

```typescript
// Provide clear authorization error messages
try {
  await this.policyService.validatePolicy(user, subject, action)
} catch (error) {
  if (error instanceof ForbiddenException) {
    throw new ForbiddenException({
      statusCode: ENUM_POLICY_STATUS_CODE_ERROR.POLICY_ABILITY_ERROR,
      message: 'policy.error.abilityForbidden',
      _error: `User does not have ${action} permission for ${subject}`,
    })
  }
  throw error
}
```

## Scenario

### Complete Authorization Flow

1. **User Authentication**: User logs in and receives JWT token with role information
2. **Route Protection**: Guard validates JWT and checks role requirements
3. **Permission Validation**: Policy service checks specific permissions for the action
4. **Resource Access**: User accesses or modifies resources based on permissions
5. **Audit Logging**: Log authorization decisions for security monitoring

```typescript
// Complete authorization flow example
@Controller('/admin/users')
export class UserAdminController {
  @Put('/:id/status')
  @AuthJwtAdminAccessProtected()  // Requires ADMIN or SUPER_ADMIN role
  async updateUserStatus(
    @Param('id') userId: string,
    @Body() { status }: { status: string },
    @AuthJwtPayload() payload: AuthAccessPayloadSerialization
  ): Promise<IResponse> {
    // 1. Role-based access control (handled by decorator)
    // 2. Permission-based authorization
    await this.policyService.validatePolicy(
      payload.user,
      ENUM_POLICY_SUBJECT.USER,
      ENUM_POLICY_ACTION.UPDATE
    )

    // 3. Business logic validation
    if (payload.user._id === userId && status === 'INACTIVE') {
      throw new BadRequestException('Cannot deactivate own account')
    }

    // 4. Execute the operation
    const user = await this.userService.update(userId, { status })
    
    // 5. Log the action
    await this.auditService.log({
      user: payload.user._id,
      action: 'UPDATE_USER_STATUS',
      resource: userId,
      details: { status },
    })

    return {
      data: user,
      message: 'user.update',
    }
  }
}
```

This authorization system provides a robust, flexible, and secure foundation for managing user access and permissions with comprehensive role-based and policy-based access control.
