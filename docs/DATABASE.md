# Database Schema Documentation

This document provides comprehensive information about the AIN-NestJS database schema, including collections, relationships, and data models.

## Table of Contents

- [Overview](#overview)
- [Database Design](#database-design)
- [Collections](#collections)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Data Types](#data-types)
- [Schema Validation](#schema-validation)
- [Migration Strategy](#migration-strategy)
- [Performance Considerations](#performance-considerations)

## Overview

AIN-NestJS uses MongoDB as its primary database with Mongoose ODM for schema definition and data modeling. The database is designed to support a multi-tenant AI-powered resume generation platform.

### Database Information
- **Database Engine**: MongoDB 5.0+
- **ODM**: Mongoose
- **Schema Language**: TypeScript with Mongoose decorators
- **Validation**: Mongoose schema validation + class-validator

## Database Design

### Design Principles

1. **Document-Oriented**: Leverages MongoDB's document structure for complex data
2. **Denormalization**: Strategic denormalization for read performance
3. **Embedded vs Referenced**: Balance between embedding and referencing based on usage patterns
4. **Indexing Strategy**: Comprehensive indexing for query optimization
5. **Schema Evolution**: Flexible schema design for future extensions

### Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                       User Domain                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │    Users    │ │    Roles    │ │   Plans     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                    Resume Domain                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│  │   Resumes   │ │  Templates  │ │   History   │             │
│  └─────────────┘ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                     AI Domain                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│  │    Chats    │ │  Prompts    │ │   Inputs    │             │
│  └─────────────┘ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                Reference Data Domain                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│  │ Categories  │ │   Skills    │ │ Companies   │             │
│  └─────────────┘ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## Collections

### Core Collections

#### 1. Users Collection

**Purpose**: Store user account information and authentication data

```typescript
interface UserDocument {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  mobileNumber?: string;
  email: string;
  role: ObjectId; // Reference to Role
  password: string; // Hashed
  passwordExpired?: Date;
  passwordCreated: Date;
  passwordAttempt: number;
  signUpDate: Date;
  signUpFrom: ENUM_USER_SIGN_UP_FROM;
  salt: string;
  blocked?: boolean;
  blockedDate?: Date;
  inactivePermanent?: boolean;
  inactiveDate?: Date;
  avatar?: string; // S3 URL
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Schema Definition**:
```typescript
@Schema({ timestamps: true })
export class UserEntity {
  @Prop({ required: true, index: true })
  firstName: string;

  @Prop({ required: true, index: true })
  lastName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ unique: true, sparse: true, index: true })
  mobileNumber?: string;

  @Prop({ required: true, ref: RoleEntity.name, index: true })
  role: Types.ObjectId;

  @Prop({ required: true })
  password: string;

  @Prop()
  passwordExpired?: Date;

  @Prop({ required: true, default: Date.now })
  passwordCreated: Date;

  @Prop({ required: true, default: 0 })
  passwordAttempt: number;

  @Prop({ required: true, default: Date.now })
  signUpDate: Date;

  @Prop({ required: true, enum: ENUM_USER_SIGN_UP_FROM })
  signUpFrom: ENUM_USER_SIGN_UP_FROM;

  @Prop({ required: true })
  salt: string;

  @Prop({ default: false })
  blocked?: boolean;

  @Prop()
  blockedDate?: Date;

  @Prop({ default: false })
  inactivePermanent?: boolean;

  @Prop()
  inactiveDate?: Date;

  @Prop()
  avatar?: string;

  @Prop({ required: true, default: true, index: true })
  isActive: boolean;
}
```

#### 2. Resumes Collection

**Purpose**: Store resume data with embedded sections

```typescript
interface ResumeDocument {
  _id: ObjectId;
  user: ObjectId; // Reference to User
  title: string;
  template: ObjectId; // Reference to Template

  // Personal Information
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: AddressInfo;
    photo?: string;
    summary?: string;
  };

  // Resume Sections (Embedded)
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  awards: AwardItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  interests: string[];

  // Metadata
  generationType: ENUM_RESUME_GENERATION_TYPE;
  language: ENUM_LANGUAGE;
  isPublic: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Embedded Schemas**:
```typescript
// Work Experience Schema
@Schema({ _id: false })
export class WorkExperienceSchema {
  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  location?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ default: false })
  isCurrent: boolean;

  @Prop({ type: [String] })
  responsibilities: string[];

  @Prop({ type: [String] })
  achievements: string[];

  @Prop({ type: [String] })
  technologies: string[];
}

// Education Schema
@Schema({ _id: false })
export class EducationSchema {
  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  institution: string;

  @Prop()
  location?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop()
  gpa?: number;

  @Prop()
  major?: string;

  @Prop({ type: [String] })
  coursework: string[];

  @Prop({ type: [String] })
  honors: string[];
}

// Skills Schema
@Schema({ _id: false })
export class SkillSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ENUM_SKILL_LEVEL })
  level: ENUM_SKILL_LEVEL;

  @Prop({ required: true, enum: ENUM_SKILL_CATEGORY })
  category: ENUM_SKILL_CATEGORY;

  @Prop()
  yearsOfExperience?: number;

  @Prop({ default: false })
  certified: boolean;
}
```

#### 3. Templates Collection

**Purpose**: Store resume template configurations

```typescript
interface TemplateDocument {
  _id: ObjectId;
  name: string;
  description?: string;
  category: string;

  // Template Configuration
  settings: {
    layout: ENUM_TEMPLATE_LAYOUT;
    colorScheme: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
    fonts: {
      header: string;
      body: string;
      size: {
        header: number;
        body: number;
        subheader: number;
      };
    };
    spacing: {
      margins: number;
      sections: number;
      lineHeight: number;
    };
  };

  // Template Structure
  sections: {
    order: string[];
    visibility: Record<string, boolean>;
    customSections?: CustomSection[];
  };

  // Metadata
  isPublic: boolean;
  isActive: boolean;
  preview?: string; // Preview image URL
  createdBy?: ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}
```

#### 4. Chats Collection

**Purpose**: Store AI chat conversations

```typescript
interface ChatDocument {
  _id: ObjectId;
  user: ObjectId; // Reference to User
  title?: string;

  // Conversation Messages
  messages: {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: {
      model?: string;
      tokens?: number;
      cost?: number;
    };
  }[];

  // Context Information
  context: {
    resumeId?: ObjectId;
    section?: string;
    occupation?: string;
    language: ENUM_LANGUAGE;
  };

  // Metadata
  isActive: boolean;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Reference Data Collections

#### 5. Roles Collection

```typescript
interface RoleDocument {
  _id: ObjectId;
  name: string;
  type: ENUM_ROLE_TYPE;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 6. Plans Collection

```typescript
interface PlanDocument {
  _id: ObjectId;
  name: string;
  description?: string;
  type: ENUM_PLAN_TYPE;

  // Pricing
  price: {
    amount: number;
    currency: string;
    interval: ENUM_BILLING_INTERVAL;
  };

  // Feature Limits
  limits: {
    resumeCount: number;
    aiGenerations: number;
    voiceGenerations: number;
    chatMessages: number;
    fileStorage: number; // in MB
    templatesAccess: number;
  };

  // Features Access
  features: {
    advancedTemplates: boolean;
    aiEnhancement: boolean;
    voiceToResume: boolean;
    exportFormats: string[];
    prioritySupport: boolean;
  };

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 7. Categories Collection

```typescript
interface CategoryDocument {
  _id: ObjectId;
  name: string;
  description?: string;
  type: ENUM_CATEGORY_TYPE;

  // AI Configuration
  prompts: {
    [key: string]: {
      template: string;
      variables: string[];
      model: string;
      maxTokens: number;
    };
  };

  // Associated Data
  inputs: ObjectId[]; // References to Input documents

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Utility Collections

#### 8. Settings Collection

```typescript
interface SettingDocument {
  _id: ObjectId;
  name: string;
  value: any;
  type: ENUM_SETTING_TYPE;
  description?: string;
  isSystem: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 9. History Collection

```typescript
interface HistoryDocument {
  _id: ObjectId;
  user: ObjectId;
  entity: string; // Collection name
  entityId: ObjectId;
  action: ENUM_HISTORY_ACTION;

  // Change tracking
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];

  // Metadata
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
}
```

## Relationships

### Relationship Diagram

```
Users ──────┐
     │      │
     │      ▼
     │   UserPlans ────▶ Plans
     │
     ▼
  Resumes ────▶ Templates
     │
     ▼
   Chats
     │
     ▼
  History

Categories ────▶ Prompts
     │
     ▼
   Inputs
```

### Relationship Types

#### 1. One-to-Many Relationships

**User → Resumes**
```typescript
// User can have multiple resumes
@Prop({ type: [{ type: Types.ObjectId, ref: 'Resume' }] })
resumes: Types.ObjectId[];
```

**User → Chats**
```typescript
// User can have multiple chat sessions
@Prop({ type: Types.ObjectId, ref: 'User', required: true })
user: Types.ObjectId;
```

#### 2. Many-to-One Relationships

**Resume → User**
```typescript
// Each resume belongs to one user
@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
user: Types.ObjectId;
```

**Resume → Template**
```typescript
// Each resume uses one template
@Prop({ type: Types.ObjectId, ref: 'Template', required: true })
template: Types.ObjectId;
```

#### 3. Many-to-Many Relationships

**User → Plans** (through UserPlan)
```typescript
// Users can have multiple plans over time
@Schema({ timestamps: true })
export class UserPlanEntity {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
  plan: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ required: true, default: true })
  isActive: boolean;
}
```

## Indexes

### Primary Indexes

```typescript
// Users collection indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ mobileNumber: 1 }, { unique: true, sparse: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ isActive: 1 });
db.users.createIndex({ createdAt: -1 });

// Resumes collection indexes
db.resumes.createIndex({ user: 1, isActive: 1 });
db.resumes.createIndex({ user: 1, createdAt: -1 });
db.resumes.createIndex({ template: 1 });
db.resumes.createIndex({ "personalInfo.email": 1 });
db.resumes.createIndex({ generationType: 1 });
db.resumes.createIndex({ language: 1 });

// Chats collection indexes
db.chats.createIndex({ user: 1, lastActivity: -1 });
db.chats.createIndex({ user: 1, isActive: 1 });
db.chats.createIndex({ "context.resumeId": 1 });

// Templates collection indexes
db.templates.createIndex({ isPublic: 1, isActive: 1 });
db.templates.createIndex({ category: 1, isActive: 1 });
db.templates.createIndex({ createdBy: 1 });

// Plans collection indexes
db.plans.createIndex({ type: 1, isActive: 1 });
db.plans.createIndex({ "price.amount": 1 });

// Categories collection indexes
db.categories.createIndex({ type: 1, isActive: 1 });
db.categories.createIndex({ name: 1 }, { unique: true });
```

### Compound Indexes

```typescript
// User activity tracking
db.users.createIndex({ isActive: 1, lastLoginAt: -1 });

// Resume filtering and sorting
db.resumes.createIndex({ user: 1, isActive: 1, createdAt: -1 });
db.resumes.createIndex({ user: 1, template: 1 });

// Chat session management
db.chats.createIndex({ user: 1, isActive: 1, lastActivity: -1 });

// Historical data queries
db.history.createIndex({ user: 1, timestamp: -1 });
db.history.createIndex({ entity: 1, entityId: 1, timestamp: -1 });
```

### Text Indexes

```typescript
// Full-text search indexes
db.resumes.createIndex({
  title: "text",
  "personalInfo.firstName": "text",
  "personalInfo.lastName": "text",
  "workExperience.jobTitle": "text",
  "workExperience.company": "text"
});

db.templates.createIndex({
  name: "text",
  description: "text",
  category: "text"
});

db.skills.createIndex({
  name: "text",
  category: "text"
});
```

## Data Types

### Enumerations

```typescript
// User-related enums
export enum ENUM_USER_SIGN_UP_FROM {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  LINKEDIN = 'LINKEDIN'
}

export enum ENUM_ROLE_TYPE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

// Resume-related enums
export enum ENUM_RESUME_GENERATION_TYPE {
  MANUAL = 'MANUAL',
  AI = 'AI',
  VOICE = 'VOICE'
}

export enum ENUM_LANGUAGE {
  EN = 'en',
  FA = 'fa'
}

export enum ENUM_SKILL_LEVEL {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export enum ENUM_SKILL_CATEGORY {
  TECHNICAL = 'TECHNICAL',
  SOFT = 'SOFT',
  LANGUAGE = 'LANGUAGE',
  TOOL = 'TOOL'
}

// Template-related enums
export enum ENUM_TEMPLATE_LAYOUT {
  SINGLE_COLUMN = 'SINGLE_COLUMN',
  TWO_COLUMN = 'TWO_COLUMN',
  MODERN = 'MODERN',
  CLASSIC = 'CLASSIC'
}

// Plan-related enums
export enum ENUM_PLAN_TYPE {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export enum ENUM_BILLING_INTERVAL {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  LIFETIME = 'LIFETIME'
}
```

### Custom Types

```typescript
// Address Information
interface AddressInfo {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

// File Information
interface FileInfo {
  originalName: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}

// Usage Statistics
interface UsageStats {
  resumeCount: number;
  aiGenerations: number;
  voiceGenerations: number;
  chatMessages: number;
  storageUsed: number;
}
```

## Schema Validation

### Mongoose Validation

```typescript
// User schema validation
@Schema({ timestamps: true })
export class UserEntity {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 50,
    match: /^[a-zA-Z\s]+$/
  })
  firstName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  })
  email: string;

  @Prop({
    match: /^\+?[1-9]\d{1,14}$/,
    sparse: true
  })
  mobileNumber?: string;
}

// Resume schema validation
@Schema({ timestamps: true })
export class ResumeEntity {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 100
  })
  title: string;

  @Prop({
    type: PersonalInfoSchema,
    required: true,
    validate: {
      validator: function(v: PersonalInfo) {
        return v.firstName && v.lastName && v.email;
      },
      message: 'Personal info must include firstName, lastName, and email'
    }
  })
  personalInfo: PersonalInfo;
}
```

### Class Validator Integration

```typescript
// DTO validation
export class CreateResumeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @IsMongoId()
  @IsOptional()
  template?: string;

  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo: PersonalInfoDto;
}

export class PersonalInfoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phone?: string;
}
```

## Migration Strategy

### Schema Evolution

```typescript
// Migration service for schema changes
@Injectable()
export class MigrationService {
  async migrateUsersV1ToV2() {
    // Add new fields with default values
    await this.userModel.updateMany(
      { version: { $exists: false } },
      {
        $set: {
          version: 2,
          lastLoginAt: new Date(),
          loginCount: 0
        }
      }
    );
  }

  async migrateResumesAddLanguageField() {
    // Add language field to existing resumes
    await this.resumeModel.updateMany(
      { language: { $exists: false } },
      { $set: { language: ENUM_LANGUAGE.EN } }
    );
  }
}
```

### Data Transformation

```typescript
// Transform legacy data to new format
async transformWorkExperience() {
  const resumes = await this.resumeModel.find({
    'workExperience.description': { $exists: true }
  });

  for (const resume of resumes) {
    const transformedExperience = resume.workExperience.map(exp => ({
      ...exp,
      responsibilities: exp.description ? [exp.description] : [],
      achievements: []
    }));

    await this.resumeModel.updateOne(
      { _id: resume._id },
      { $set: { workExperience: transformedExperience } }
    );
  }
}
```

## Performance Considerations

### Query Optimization

```typescript
// Efficient pagination
async findResumesPaginated(userId: string, page: number, limit: number) {
  return this.resumeModel
    .find({ user: userId, isActive: true })
    .select('title createdAt updatedAt personalInfo.firstName personalInfo.lastName')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();
}

// Aggregation for analytics
async getUserStats(userId: string) {
  return this.resumeModel.aggregate([
    { $match: { user: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$generationType',
        count: { $sum: 1 },
        lastCreated: { $max: '$createdAt' }
      }
    }
  ]);
}
```

### Memory Management

```typescript
// Use streams for large datasets
async exportUserData(userId: string) {
  const cursor = this.resumeModel
    .find({ user: userId })
    .cursor();

  return cursor.pipe(
    new Transform({
      objectMode: true,
      transform(doc, encoding, callback) {
        callback(null, JSON.stringify(doc) + '\n');
      }
    })
  );
}
```

### Connection Optimization

```typescript
// Connection pool configuration
mongoose.connect(mongoUri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
  bufferCommands: false
});
```

This database schema documentation provides a comprehensive overview of the AIN-NestJS data model and database design decisions.