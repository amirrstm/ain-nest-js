# Installation Guide

This guide will walk you through the complete installation process for AIN-NestJS, from setting up prerequisites to running the application.

## Prerequisites

Before starting, ensure you have the following tools installed. We recommend using the LTS (Long Term Support) versions for stability and compatibility.

### Required Tools

| Tool | Minimum Version | Recommended Version | Purpose |
|------|----------------|---------------------|---------|
| [Node.js][ref-nodejs] | 18.0.0 | 18.17.0+ (LTS) | JavaScript runtime |
| [MongoDB][ref-mongodb] | 5.0 | 6.0+ | Database |
| [Yarn][ref-yarn] | 1.22.0 | Latest | Package manager |
| [Git][ref-git] | 2.0.0 | Latest | Version control |

### Optional Tools

| Tool | Purpose |
|------|---------|
| [Docker][ref-docker] | Containerization |
| [Docker Compose][ref-dockercompose] | Multi-container orchestration |

### System Requirements

- **Memory**: Minimum 2GB RAM (4GB+ recommended)
- **Storage**: At least 2GB free space
- **Operating System**: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### External Services (Required)

Before installation, obtain the following API keys:

1. **OpenAI API Key**: Register at [OpenAI Platform](https://platform.openai.com/)
2. **AWS S3 Credentials** (Optional): For file storage
3. **Google OAuth2** (Optional): For social authentication
4. **LinkedIn OAuth2** (Optional): For social authentication
5. **SMS Service API** (Optional): For mobile verification

## Installation Methods

### Method 1: Local Installation (Recommended for Development)

#### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/AIN-NestJS.git
cd AIN-NestJS

# Verify the clone
ls -la
```

#### Step 2: Install Dependencies

```bash
# Install all dependencies
yarn install

# Verify installation
yarn --version
node --version
```

#### Step 3: Environment Configuration

```bash
# Create environment file from template
cp .env.example .env

# Edit the environment file
nano .env  # or use your preferred editor
```

**Required Environment Variables:**

```bash
# Application Settings
APP_NAME=AIN-Development
APP_ENV=development
HTTP_PORT=4000

# Database
DATABASE_HOST=mongodb://localhost:27017
DATABASE_NAME=ain-development

# Authentication
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY=your-32-char-secret-key
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY=your-32-char-refresh-secret

# OpenAI (Required)
OPEN_AI_SECRET_KEY=sk-your-openai-api-key-here

# Frontend URL
APP_FRONT_END_URL=http://localhost:3000
```

#### Step 4: Database Setup

```bash
# Start MongoDB (if installed locally)
mongod

# Or start MongoDB service (Linux/macOS)
sudo systemctl start mongod
brew services start mongodb/brew/mongodb-community

# Verify MongoDB is running
mongo --eval "db.runCommand({ connectionStatus: 1 })"
```

#### Step 5: Seed the Database

```bash
# Run all database seeds
yarn seed

# Or run individual seeds
yarn seed:role
yarn seed:user
yarn seed:plan
yarn seed:template
```

#### Step 6: Run the Application

```bash
# Development mode (with hot reload)
yarn start:dev

# Debug mode
yarn start:debug

# Verify the application is running
curl http://localhost:4000/health
```

### Method 2: Docker Installation (Recommended for Production)

#### Step 1: Install Docker

**For Ubuntu:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**For macOS:**
Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)

**For Windows:**
Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)

#### Step 2: Clone and Configure

```bash
# Clone the repository
git clone https://github.com/yourusername/AIN-NestJS.git
cd AIN-NestJS

# Create environment file
cp .env.example .env.production
# Edit .env.production with your production settings
```

#### Step 3: Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

## Verification

### Health Checks

After installation, verify everything is working:

```bash
# Check application health
curl http://localhost:4000/health

# Check database connection
curl http://localhost:4000/health/database

# Check API documentation
open http://localhost:4000/docs
```

### Test the Installation

```bash
# Run unit tests
yarn test

# Run tests with coverage
yarn test:cov

# Check code quality
yarn lint
yarn format
```

## Run Project with Docker

For docker installation, we need more tools to be installed.

1. [Docker][ref-docker]
2. [Docker-Compose][ref-dockercompose]

### Create environment

Make your own environment file with a copy of `env.example` and adjust values to suit your own environment.

```bash
cp .env.example .env
```

then run

```bash
docker-compose up -d
```

## Database Mongo Replication locally

> Optional

If we want run mongo replication locally, i already provide docker compose.

1. Go to `./ci`
2. then run `docker-compose -f docker-compose.mongo-replica.yml up -d`

After that, we need manual configure mongodb.
In this case primary will be `mongo1`

1. Enter the `mongo1 container`

    ```bash
    docker exec -it mongo1 mongosh
    ```

2. In mongo1 container, tell mongo1 to be primary and run as replication set

    ```js
    rs.initiate(
        {
            _id: 'rs0',
            members: [
                { _id: 0, host: 'mongo1:27017', priority: 3 },
                { _id: 1, host: 'mongo2:27017', priority: 2 },
                { _id: 2, host: 'mongo3:27017', priority: 1 },
            ],
        },
        { force: true }
    );
    ```

    will return response `{status: ok}`

    then exit the container

    ```bash
    exit
    ```

3. Adjust env file

    > Adjust with your own environment

    ```env
    ...

    DATABASE_HOST=mongodb://mongo1:27017,mongo2:27017,mongo3:27017
    DATABASE_NAME=ain
    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_DEBUG=false
    DATABASE_OPTIONS=replicaSet=rs0&retryWrites=true&w=majority

    ...
    ```

4. Restart the service container

    ```bash
    docker restart service
    ```

<!-- Reference -->

[ref-nestjs]: http://nestjs.com
[ref-mongoose]: https://mongoosejs.com
[ref-mongodb]: https://docs.mongodb.com/
[ref-nodejs]: https://nodejs.org/
[ref-typescript]: https://www.typescriptlang.org/
[ref-docker]: https://docs.docker.com
[ref-dockercompose]: https://docs.docker.com/compose/
[ref-yarn]: https://yarnpkg.com
[ref-12factor]: https://12factor.net
[ref-nestjscommand]: https://gitlab.com/aa900031/nestjs-command
[ref-jwt]: https://jwt.io
[ref-jest]: https://jestjs.io/docs/getting-started
[ref-git]: https://git-scm.com
