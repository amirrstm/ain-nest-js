# Deployment Guide

This guide provides comprehensive instructions for deploying AIN-NestJS to various environments, from local development to production servers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Database Setup](#database-setup)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Monitoring and Logging](#monitoring-and-logging)
- [Backup and Recovery](#backup-and-recovery)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- **Node.js**: v18.0.0 or higher
- **MongoDB**: v5.0 or higher
- **Memory**: Minimum 2GB RAM (4GB+ recommended for production)
- **Storage**: Minimum 10GB free space
- **Operating System**: Linux (Ubuntu 20.04+), macOS, or Windows

### Required Services
- **OpenAI API**: Valid API key required
- **AWS S3**: For file storage (optional but recommended)
- **SMS Service**: For mobile verification (optional)
- **Email Service**: For notifications (optional)

## Environment Configuration

### 1. Environment Variables

Create environment files based on your deployment environment:

#### Development (.env.development)
```bash
# Application
APP_NAME=AIN-Development
APP_ENV=development
APP_LANGUAGE=en
APP_TZ=UTC
APP_MAINTENANCE=false

# HTTP Configuration
HTTP_VERSION=1
HTTP_ENABLE=true
HTTP_HOST=127.0.0.1
HTTP_PORT=4000
HTTP_VERSIONING_ENABLE=true

# Database
DATABASE_NAME=ain-dev
DATABASE_DEBUG=true
DATABASE_HOST=mongodb://localhost:27017

# Authentication
AUTH_JWT_SUBJECT=jwt-development
AUTH_JWT_ISSUER=jwt-development
AUTH_JWT_AUDIENCE=https://localhost:4000
AUTH_JWT_PAYLOAD_ENCRYPT=false
AUTH_JWT_ACCESS_TOKEN_EXPIRED=7d
AUTH_JWT_REFRESH_TOKEN_EXPIRED=30d
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY=your-access-token-secret-key-here
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY=your-refresh-token-secret-key-here

# OpenAI
OPEN_AI_SECRET_KEY=sk-your-openai-api-key-here

# Frontend URL
APP_FRONT_END_URL=http://localhost:3000

# Debug
DEBUGGER_WRITE_INTO_FILE=true
JOB_ENABLE=true
NODE_ENV=development
```

#### Production (.env.production)
```bash
# Application
APP_NAME=AIN-Production
APP_ENV=production
APP_LANGUAGE=en
APP_TZ=UTC
APP_MAINTENANCE=false

# HTTP Configuration
HTTP_VERSION=1
HTTP_ENABLE=true
HTTP_HOST=0.0.0.0
HTTP_PORT=4000
HTTP_VERSIONING_ENABLE=true

# Database
DATABASE_NAME=ain-production
DATABASE_DEBUG=false
DATABASE_HOST=mongodb://username:password@your-mongodb-host:27017

# Authentication
AUTH_JWT_SUBJECT=jwt-production
AUTH_JWT_ISSUER=jwt-production
AUTH_JWT_AUDIENCE=https://yourdomain.com
AUTH_JWT_PAYLOAD_ENCRYPT=true
AUTH_JWT_ACCESS_TOKEN_EXPIRED=30d
AUTH_JWT_REFRESH_TOKEN_EXPIRED=182d
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY=your-secure-access-token-secret-key
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY=your-secure-refresh-token-secret-key
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY=your-encrypt-key-32-chars-long
AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV=your-encrypt-iv-16-chars
AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY=your-refresh-encrypt-key-32
AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV=your-refresh-iv-16-chars

# OpenAI
OPEN_AI_SECRET_KEY=sk-your-production-openai-api-key

# External Services
SMS_API_KEY=your-sms-service-api-key

# Social Auth
SSO_GOOGLE_CLIENT_ID=your-google-client-id
SSO_GOOGLE_CLIENT_SECRET=your-google-client-secret
SSO_GOOGLE_CALLBACK_URL=https://yourdomain.com/api/v1/auth/google/callback

SSO_LINKEDIN_CLIENT_ID=your-linkedin-client-id
SSO_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
SSO_LINKEDIN_CALLBACK_URL=https://yourdomain.com/api/v1/auth/linkedin/callback

# AWS S3
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
AWS_S3_ENDPOINT=https://s3.amazonaws.com
AWS_S3_CREDENTIAL_KEY=your-aws-access-key-id
AWS_S3_CREDENTIAL_SECRET=your-aws-secret-access-key

# Frontend URL
APP_FRONT_END_URL=https://yourdomain.com

# Debug
DEBUGGER_WRITE_INTO_FILE=false
JOB_ENABLE=true
NODE_ENV=production
```

### 2. Secret Key Generation

Generate secure secret keys for production:

```bash
# Generate 32-character random strings for JWT secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate 16-character strings for encryption IVs
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## Local Development

### 1. Quick Setup
```bash
# Clone repository
git clone https://github.com/yourusername/AIN-NestJS.git
cd AIN-NestJS

# Install dependencies
yarn install

# Setup environment
cp .env.example .env.development
# Edit .env.development with your configuration

# Start MongoDB (if running locally)
mongod

# Seed database
yarn seed

# Start development server
yarn start:dev
```

### 2. Development with Docker
```bash
# Start MongoDB with Docker
docker run -d --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:5.0

# Start application
yarn start:dev
```

## Docker Deployment

### 1. Using Docker Compose (Recommended)

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    depends_on:
      - mongodb
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs

  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: ain-production
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

#### Deployment Commands
```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Update and restart
docker-compose pull
docker-compose up -d --force-recreate
```

### 2. Manual Docker Deployment

#### Build Image
```bash
# Build production image
docker build -t ain-nestjs:latest .

# Tag for registry (optional)
docker tag ain-nestjs:latest your-registry/ain-nestjs:v1.0.0
```

#### Run Container
```bash
# Run application container
docker run -d \
  --name ain-nestjs \
  -p 4000:4000 \
  --env-file .env.production \
  -v $(pwd)/logs:/app/logs \
  ain-nestjs:latest
```

## Production Deployment

### 1. Server Setup (Ubuntu 20.04+)

#### Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (Reverse Proxy)
sudo apt install -y nginx

# Install Docker (optional)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 2. Application Deployment

#### Manual Deployment
```bash
# Create application directory
sudo mkdir -p /var/www/ain-nestjs
sudo chown $USER:$USER /var/www/ain-nestjs

# Clone and build application
cd /var/www/ain-nestjs
git clone https://github.com/yourusername/AIN-NestJS.git .
yarn install --production
yarn build

# Setup environment
cp .env.example .env.production
# Edit .env.production with production values

# Setup PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### PM2 Configuration (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'ain-nestjs',
    script: 'dist/src/main.js',
    cwd: '/var/www/ain-nestjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    env_file: '.env.production',
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024'
  }]
};
```

### 3. Nginx Configuration

#### /etc/nginx/sites-available/ain-nestjs
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    # File upload size
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Enable Configuration
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ain-nestjs /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Cloud Deployment

### 1. AWS Deployment

#### Using AWS ECS with Fargate
```yaml
# ecs-task-definition.json
{
  "family": "ain-nestjs",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "ain-nestjs",
      "image": "your-account.dkr.ecr.region.amazonaws.com/ain-nestjs:latest",
      "portMappings": [
        {
          "containerPort": 4000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_HOST",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:ain/database"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ain-nestjs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### 2. Google Cloud Platform

#### Using Cloud Run
```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/ain-nestjs', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/ain-nestjs']
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
    - 'run'
    - 'deploy'
    - 'ain-nestjs'
    - '--image'
    - 'gcr.io/$PROJECT_ID/ain-nestjs'
    - '--region'
    - 'us-central1'
    - '--platform'
    - 'managed'
    - '--allow-unauthenticated'
```

### 3. DigitalOcean App Platform

#### app.yaml
```yaml
name: ain-nestjs
services:
- name: api
  source_dir: /
  github:
    repo: yourusername/AIN-NestJS
    branch: main
  run_command: yarn start:prod
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  env:
  - key: NODE_ENV
    value: production
  - key: DATABASE_HOST
    value: ${db.DATABASE_URL}
    type: SECRET
databases:
- engine: MONGODB
  name: db
  num_nodes: 1
  size: db-s-dev-database
  version: "5"
```

## Database Setup

### 1. MongoDB Configuration

#### Production MongoDB Setup
```bash
# MongoDB configuration file (/etc/mongod.conf)
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1

security:
  authorization: enabled

replication:
  replSetName: "rs0"
```

#### Database Initialization
```bash
# Connect to MongoDB
mongo

# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "your-secure-password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Create application database and user
use ain-production
db.createUser({
  user: "ain-user",
  pwd: "your-app-password",
  roles: ["readWrite"]
})

# Initialize replica set (if using replication)
rs.initiate()
```

### 2. Database Seeding

```bash
# Run database seeds
yarn seed

# Or run individual seeds
yarn seed:role
yarn seed:user
yarn seed:plan
yarn seed:template
```

## SSL/TLS Configuration

### 1. Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal setup
sudo crontab -e
# Add line: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. Custom SSL Certificate

```bash
# Install SSL certificate
sudo mkdir -p /etc/nginx/ssl
sudo cp your-certificate.crt /etc/nginx/ssl/
sudo cp your-private.key /etc/nginx/ssl/
sudo chmod 600 /etc/nginx/ssl/*
```

## Monitoring and Logging

### 1. Application Monitoring

#### PM2 Monitoring
```bash
# Monitor application
pm2 monit

# View logs
pm2 logs ain-nestjs

# Restart application
pm2 restart ain-nestjs
```

#### Health Checks
```bash
# Application health endpoint
curl http://localhost:4000/health

# Database health
curl http://localhost:4000/health/database
```

### 2. Log Management

#### Log Rotation Configuration
```bash
# /etc/logrotate.d/ain-nestjs
/var/www/ain-nestjs/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reload ain-nestjs
    endscript
}
```

## Backup and Recovery

### 1. Database Backup

```bash
# Create backup script (/usr/local/bin/backup-mongodb.sh)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
mkdir -p $BACKUP_DIR

mongodump --host localhost:27017 \
          --db ain-production \
          --username ain-user \
          --password your-app-password \
          --out $BACKUP_DIR/backup_$DATE

# Compress backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $BACKUP_DIR backup_$DATE
rm -rf $BACKUP_DIR/backup_$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
```

#### Schedule Backups
```bash
# Add to crontab
sudo crontab -e
# Add line: 0 2 * * * /usr/local/bin/backup-mongodb.sh
```

### 2. Database Restore

```bash
# Restore from backup
mongorestore --host localhost:27017 \
             --db ain-production \
             --username ain-user \
             --password your-app-password \
             /path/to/backup/directory
```

## Troubleshooting

### Common Issues

#### 1. Application Won't Start
```bash
# Check PM2 status
pm2 status

# Check application logs
pm2 logs ain-nestjs

# Check system resources
free -h
df -h
```

#### 2. Database Connection Issues
```bash
# Test MongoDB connection
mongo --host localhost:27017 -u ain-user -p

# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

#### 3. Memory Issues
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Restart application
pm2 restart ain-nestjs
```

#### 4. SSL Certificate Issues
```bash
# Test SSL certificate
openssl x509 -in /path/to/certificate.crt -text -noout

# Check certificate expiry
openssl x509 -in /path/to/certificate.crt -noout -dates
```

### Performance Optimization

#### 1. Application Optimization
- Enable clustering with PM2
- Optimize database queries and indexes
- Implement caching strategies
- Use CDN for static assets

#### 2. Server Optimization
```bash
# Increase file descriptor limits
echo "* soft nofile 65535" >> /etc/security/limits.conf
echo "* hard nofile 65535" >> /etc/security/limits.conf

# Optimize MongoDB
echo "vm.swappiness = 1" >> /etc/sysctl.conf
echo "net.core.somaxconn = 65535" >> /etc/sysctl.conf
```

## Security Checklist

- [ ] Use HTTPS/SSL in production
- [ ] Keep all dependencies updated
- [ ] Use strong passwords and secret keys
- [ ] Enable MongoDB authentication
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Monitor application logs
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular backup verification

This deployment guide covers all major aspects of deploying AIN-NestJS from development to production environments.