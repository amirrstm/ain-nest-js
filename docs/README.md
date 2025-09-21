# AIN-NestJS Documentation

Welcome to the comprehensive documentation for AIN-NestJS, an AI-powered resume generation and management platform.

## Overview

AIN-NestJS is a sophisticated backend service built with NestJS and TypeScript that provides intelligent resume building capabilities. The platform leverages OpenAI's powerful AI models to offer features like voice-to-resume conversion, AI content generation, and multi-language support.

## Documentation Structure

### Getting Started

| Document | Description | Audience |
|----------|-------------|----------|
| [Installation Guide](installation.md) | Complete setup instructions | Developers |
| [Configuration Guide](configuration.md) | Environment and service configuration | DevOps, Developers |
| [API Documentation](api.md) | RESTful API reference | Frontend Developers, Integrators |

### Architecture & Design

| Document | Description | Audience |
|----------|-------------|----------|
| [Architecture Overview](architecture.md) | System design and patterns | Architects, Senior Developers |
| [Database Schema](database.md) | Data models and relationships | Database Developers |
| [Authentication & Authorization](authentication.md) | Security implementation | Security Engineers |

### Features & Functionality

| Document | Description | Audience |
|----------|-------------|----------|
| [AI Features Guide](ai-features.md) | OpenAI integration and AI capabilities | Developers, Product Managers |
| [Multi-Language Support](language.md) | Internationalization (i18n) | Developers |
| [Response Handling](response.md) | API response structure | Frontend Developers |
| [Pagination](pagination.md) | Data pagination system | Frontend Developers |

### Deployment & Operations

| Document | Description | Audience |
|----------|-------------|----------|
| [Deployment Guide](deployment.md) | Production deployment instructions | DevOps, System Administrators |
| [Environment Configuration](environment.md) | Environment-specific settings | DevOps |
| [Logging & Debugging](logger.md) | Application logging | Developers, Operations |

### Development

| Document | Description | Audience |
|----------|-------------|----------|
| [Repository Pattern](repository.md) | Data access patterns | Backend Developers |
| [Guards & Authorization](guard.md) | Security middleware | Developers |
| [Application Behavior](behaviour.md) | Core application behaviors | Developers |

## Quick Navigation

### For New Developers
1. Start with [Installation Guide](installation.md)
2. Read [Architecture Overview](architecture.md)
3. Review [API Documentation](api.md)
4. Explore [AI Features Guide](ai-features.md)

### For DevOps Engineers
1. Review [Deployment Guide](deployment.md)
2. Configure [Environment Settings](configuration.md)
3. Set up [Monitoring & Logging](logger.md)

### For Frontend Developers
1. Read [API Documentation](api.md)
2. Understand [Response Handling](response.md)
3. Implement [Pagination](pagination.md)
4. Handle [Multi-Language Support](language.md)

## Key Features Covered

### 🤖 AI Integration
- OpenAI GPT models for content generation
- Voice-to-resume using Whisper API
- Intelligent content enhancement
- Multi-language AI responses

### 👥 User Management
- JWT-based authentication
- OAuth2 social login (Google, LinkedIn)
- Role-based access control
- Mobile verification

### 📄 Resume Features
- Template-based resume generation
- PDF export capabilities
- Section-wise content management
- AI-powered content suggestions

### 🌐 Multi-Language
- English and Persian (Farsi) support
- Dynamic language switching
- Localized error messages
- RTL language support

### 🔒 Security
- JWT token management
- Rate limiting
- Input validation
- SQL injection prevention

## API Endpoints Overview

The platform provides RESTful APIs organized by access levels:

- **Public APIs**: `/api/v1/public/*` - Templates, reference data
- **User APIs**: `/api/v1/user/*` - User-specific features
- **Admin APIs**: `/api/v1/admin/*` - Administrative functions
- **Auth APIs**: `/api/v1/auth/*` - Authentication endpoints

## Technology Stack

- **Backend**: NestJS, TypeScript, Node.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: OpenAI API (GPT-3.5, GPT-4, Whisper, DALL-E)
- **Authentication**: Passport.js, JWT
- **File Storage**: AWS S3
- **Documentation**: Swagger/OpenAPI

## Support & Contribution

### Getting Help
- Review the relevant documentation section
- Check the [API Documentation](api.md) for endpoint details
- Refer to [Troubleshooting](#troubleshooting) sections in each guide

### Documentation Updates
The documentation is maintained alongside the codebase. When making changes:
1. Update relevant documentation files
2. Ensure examples are working and current
3. Update version references if applicable

### Feedback
For documentation improvements or corrections, please:
1. Open an issue describing the problem
2. Suggest improvements or corrections
3. Submit pull requests for documentation updates

---

**Last Updated**: September 2024
**Version**: 5.6.6
**Maintained by**: AmiRostami
