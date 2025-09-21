# AIN-NestJS: AI-Powered Resume Generation Platform

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-74aa9c?style=for-the-badge&logo=openai&logoColor=white)

> **AIN-NestJS** is a comprehensive AI-powered resume generation and management platform built with NestJS and TypeScript. It leverages OpenAI's GPT models to provide intelligent resume building capabilities including voice-to-resume conversion, AI content generation, and multi-language support.

## ✨ Key Features

### 🤖 AI-Powered Resume Generation
- **Voice-to-Resume**: Convert audio recordings to structured resume data using OpenAI Whisper
- **AI Content Enhancement**: Generate professional summaries, work experience highlights, and project descriptions
- **Occupation-based Generation**: Create resumes based on job titles using intelligent prompts
- **Multi-language Support**: Generate content in Persian (Farsi) and English

### 📄 Resume Management
- **Template System**: Multiple customizable resume templates with different layouts and styles
- **PDF Generation**: Server-side PDF conversion using Puppeteer
- **Section Management**: Complete CRUD operations for all resume sections (work, education, skills, projects, awards)
- **File Management**: Profile image uploads and resume file storage via AWS S3

### 👥 User Management & Authentication
- **Multi-authentication**: Email/password, Google OAuth2, and LinkedIn OAuth2
- **Mobile Verification**: OTP-based phone number verification via SMS
- **Role-based Access Control**: Admin and User roles with different permissions
- **Security Features**: JWT tokens, password encryption, rate limiting, account security

### 💼 Subscription & Plan Management
- **Plan-based Usage**: Different subscription tiers with usage limits
- **Usage Tracking**: Monitor AI generations, resume creations, and voice conversions
- **Feature Access Control**: Plans determine access to different AI models and generation types

### 💬 Interactive AI Chat
- **Conversational AI**: Chat interface powered by OpenAI's GPT models
- **Context Awareness**: Maintains conversation history and context
- **Multi-language Chat**: Supports both Persian and English conversations

## 🏗️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Backend Framework** | NestJS, TypeScript, Node.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | Passport.js, JWT, OAuth2 (Google, LinkedIn) |
| **AI Integration** | OpenAI API (GPT-3.5, GPT-4, DALL-E 3, Whisper) |
| **File Storage** | AWS S3 |
| **PDF Generation** | Puppeteer |
| **API Documentation** | Swagger/OpenAPI |
| **Validation** | Class Validator, Joi |
| **Testing** | Jest |
| **Code Quality** | ESLint, Prettier, Husky |

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- Yarn package manager
- OpenAI API key
- AWS S3 credentials (optional, for file storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AIN-NestJS.git
   cd AIN-NestJS
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   # Seed the database with initial data
   yarn seed
   ```

5. **Start the application**
   ```bash
   # Development mode
   yarn start:dev

   # Production mode
   yarn build
   yarn start:prod
   ```

### Docker Setup

```bash
# Using Docker Compose
docker-compose up -d
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Installation Guide](docs/installation.md) | Detailed setup instructions |
| [Architecture Overview](docs/architecture.md) | System design and architecture patterns |
| [API Documentation](docs/api.md) | RESTful API reference and Swagger setup |
| [Configuration Guide](docs/configuration.md) | Environment variables and settings |
| [Authentication & Authorization](docs/authentication.md) | Security implementation details |
| [AI Features Guide](docs/ai-features.md) | OpenAI integration and AI capabilities |
| [Deployment Guide](docs/deployment.md) | Production deployment instructions |
| [Database Schema](docs/database.md) | Data models and relationships |

## 🌐 API Endpoints

The application exposes RESTful APIs organized by access level:

- **Public APIs**: `/api/v1/public/*` - Open access endpoints
- **User APIs**: `/api/v1/user/*` - Authenticated user features
- **Admin APIs**: `/api/v1/admin/*` - Administrative functions
- **Auth APIs**: `/api/v1/auth/*` - Authentication endpoints

### API Documentation
- **Swagger UI**: `http://localhost:4000/docs` (when running locally)
- **OpenAPI Spec**: `http://localhost:4000/docs-json`

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:cov

# Run specific test suites
yarn test:e2e
```

## 🔧 Development Commands

```bash
# Development
yarn start:dev          # Start in development mode
yarn start:debug        # Start with debugging enabled

# Code Quality
yarn lint               # Run ESLint
yarn lint:fix           # Fix ESLint issues
yarn format             # Format code with Prettier

# Database
yarn seed               # Seed database with initial data
yarn rollback           # Rollback database changes

# Utilities
yarn deadcode           # Find unused code
yarn spell              # Spell check source code
```

## 🔒 Security Features

- **JWT Authentication**: Secure access and refresh token management
- **Password Security**: Bcrypt hashing with salt
- **Rate Limiting**: API throttling and abuse prevention
- **Role-based Authorization**: Granular permission system
- **Account Security**: Password attempt limits, account blocking
- **Data Validation**: Input sanitization and validation
- **CORS Configuration**: Cross-origin request handling

## 🌍 Internationalization

The platform supports multiple languages:
- **English** (en): Primary language
- **Persian/Farsi** (fa): Full localization support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ by [AmiRostami](mailto:amr.rostam@gmail.com)**
