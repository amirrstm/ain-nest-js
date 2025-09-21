# API Documentation

This document provides comprehensive information about the AIN-NestJS REST API, including endpoints, authentication, and usage examples.

## Table of Contents

- [API Overview](#api-overview)
- [Authentication](#authentication)
- [API Versioning](#api-versioning)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Swagger Documentation](#swagger-documentation)
- [API Endpoints Overview](#api-endpoints-overview)
- [Usage Examples](#usage-examples)

## API Overview

The AIN-NestJS API is a RESTful web service that provides access to AI-powered resume generation and management features. The API is built using NestJS and follows OpenAPI (Swagger) specifications.

### Base URL
```
http://localhost:4000/api/v1
```

### Content Type
All API requests and responses use JSON format:
```
Content-Type: application/json
```

## Authentication

The API uses multiple authentication methods depending on the endpoint:

### 1. JWT Bearer Authentication
Most user and admin endpoints require JWT tokens:

```http
Authorization: Bearer <your-jwt-token>
```

#### Obtaining JWT Tokens
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "tokenType": "Bearer",
    "expiresIn": 2592000,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. API Key Authentication
Some service endpoints use API key authentication:

```http
X-API-KEY: <your-api-key>
```

### 3. OAuth2 Authentication
Social login endpoints support Google and LinkedIn OAuth2:

```http
GET /api/v1/auth/google
GET /api/v1/auth/linkedin
```

## API Versioning

The API uses URL-based versioning:

- **Current Version**: `v1`
- **Base Path**: `/api/v1`
- **Versioning Header**: `HTTP_VERSION=1` (set in environment)

## Response Format

All API responses follow a consistent structure:

### Success Response
```json
{
  "statusCode": 200,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1234567890,
    "timezone": "Asia/Tehran",
    "path": "/api/v1/endpoint",
    "version": "1"
  }
}
```

### Paginated Response
```json
{
  "statusCode": 200,
  "message": "Data retrieved successfully",
  "data": [
    // Array of items
  ],
  "_pagination": {
    "totalData": 100,
    "totalPage": 10,
    "currentPage": 1,
    "perPage": 10,
    "availableSearch": ["name", "email"],
    "availableSort": ["createdAt", "name"]
  },
  "_metadata": {
    // Metadata
  }
}
```

## Error Handling

The API uses standard HTTP status codes and provides detailed error information:

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "property": "email",
      "value": "invalid-email",
      "constraints": {
        "isEmail": "email must be a valid email"
      }
    }
  ],
  "_metadata": {
    "languages": ["en"],
    "timestamp": 1234567890,
    "timezone": "Asia/Tehran",
    "path": "/api/v1/endpoint",
    "version": "1"
  }
}
```

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `422` | Unprocessable Entity |
| `429` | Too Many Requests |
| `500` | Internal Server Error |

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Global Rate Limit**: 100 requests per minute per IP
- **Auth Endpoints**: 5 requests per minute per IP
- **AI Generation**: 10 requests per minute per user

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

## Swagger Documentation

The API provides interactive Swagger documentation for easy testing and exploration:

### Accessing Swagger UI
- **URL**: `http://localhost:4000/docs`
- **JSON Spec**: `http://localhost:4000/docs-json`

### Swagger Features
- Interactive API testing
- Request/response examples
- Authentication testing
- Model schemas
- Parameter descriptions

## API Endpoints Overview

### Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/login` | User login | No |
| `POST` | `/register` | User registration | No |
| `POST` | `/refresh` | Refresh JWT token | No |
| `POST` | `/logout` | User logout | Yes |
| `GET` | `/google` | Google OAuth login | No |
| `GET` | `/linkedin` | LinkedIn OAuth login | No |
| `POST` | `/forgot-password` | Password reset request | No |
| `POST` | `/reset-password` | Password reset confirmation | No |

### User Endpoints (`/api/v1/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/profile` | Get user profile | Yes |
| `PUT` | `/profile` | Update user profile | Yes |
| `POST` | `/change-password` | Change password | Yes |
| `POST` | `/upload-avatar` | Upload profile image | Yes |
| `DELETE` | `/delete-account` | Delete user account | Yes |

### Resume Endpoints (`/api/v1/user/resume`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/` | List user resumes | Yes |
| `POST` | `/` | Create new resume | Yes |
| `GET` | `/:id` | Get resume details | Yes |
| `PUT` | `/:id` | Update resume | Yes |
| `DELETE` | `/:id` | Delete resume | Yes |
| `POST` | `/:id/generate-pdf` | Generate PDF | Yes |
| `POST` | `/ai-generate` | AI resume generation | Yes |
| `POST` | `/voice-generate` | Voice to resume | Yes |

### Chat Endpoints (`/api/v1/user/chat`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/` | Get chat history | Yes |
| `POST` | `/` | Send chat message | Yes |
| `DELETE` | `/:id` | Delete chat session | Yes |

### Public Endpoints (`/api/v1/public`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/templates` | List resume templates | No |
| `GET` | `/skills` | List available skills | No |
| `GET` | `/companies` | List companies | No |
| `GET` | `/universities` | List universities | No |
| `GET` | `/provinces` | List provinces | No |

### Admin Endpoints (`/api/v1/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/users` | List all users | Yes (Admin) |
| `GET` | `/users/:id` | Get user details | Yes (Admin) |
| `PUT` | `/users/:id` | Update user | Yes (Admin) |
| `DELETE` | `/users/:id` | Delete user | Yes (Admin) |
| `GET` | `/analytics` | System analytics | Yes (Admin) |

## Usage Examples

### 1. User Registration
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "mobileNumber": "+1234567890"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }'
```

### 3. Create Resume
```bash
curl -X POST http://localhost:4000/api/v1/user/resume \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Software Engineer Resume",
    "templateId": "60d5ecb74234567890123456",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890"
    }
  }'
```

### 4. AI Resume Generation
```bash
curl -X POST http://localhost:4000/api/v1/user/resume/ai-generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "occupation": "Software Engineer",
    "experience": "5 years",
    "skills": ["JavaScript", "Node.js", "React"],
    "language": "en"
  }'
```

### 5. Voice to Resume
```bash
curl -X POST http://localhost:4000/api/v1/user/resume/voice-generate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "audio=@path/to/audio/file.mp3" \
  -F "language=en"
```

### 6. Chat with AI
```bash
curl -X POST http://localhost:4000/api/v1/user/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "message": "Help me write a professional summary for my resume",
    "context": "software engineer with 5 years experience"
  }'
```

### 7. Get Resume Templates
```bash
curl -X GET http://localhost:4000/api/v1/public/templates \
  -H "Content-Type: application/json"
```

### 8. Generate PDF
```bash
curl -X POST http://localhost:4000/api/v1/user/resume/60d5ecb74234567890123456/generate-pdf \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  --output resume.pdf
```

## Request/Response Examples

### Pagination Example
```bash
curl -X GET "http://localhost:4000/api/v1/user/resume?page=1&perPage=10&sort=createdAt&search=engineer" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### File Upload Example
```bash
curl -X POST http://localhost:4000/api/v1/user/upload-avatar \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "avatar=@path/to/image.jpg"
```

## Testing with Swagger

1. Navigate to `http://localhost:4000/docs`
2. Click on "Authorize" button
3. Enter your JWT token: `Bearer YOUR_JWT_TOKEN`
4. Test any endpoint directly in the browser

## Environment-Specific URLs

### Development
```
Base URL: http://localhost:4000/api/v1
Swagger: http://localhost:4000/docs
```

### Production
```
Base URL: https://your-domain.com/api/v1
Swagger: https://your-domain.com/docs
```

## API Client Libraries

The API can be consumed using any HTTP client. For JavaScript/TypeScript projects, you can generate client libraries from the OpenAPI specification:

```bash
# Generate TypeScript client
npx swagger-codegen-cli generate -i http://localhost:4000/docs-json -l typescript-fetch -o ./api-client
```

This comprehensive API documentation should help developers integrate with the AIN-NestJS platform effectively.