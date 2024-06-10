import Joi from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import configs from 'src/configs'
import { PdfModule } from './pdf/pdf.module'
import { SmsModule } from './sms/sms.module'
import { OpenAIModule } from './open-ai/open-ai.module'
import { AuthModule } from 'src/common/auth/auth.module'
import { ErrorModule } from 'src/common/error/error.module'
import { PolicyModule } from 'src/common/policy/policy.module'
import { HelperModule } from 'src/common/helper/helper.module'
import { RequestModule } from 'src/common/request/request.module'
import { MessageModule } from 'src/common/message/message.module'
import { ResponseModule } from 'src/common/response/response.module'
import { PaginationModule } from 'src/common/pagination/pagination.module'
import { DatabaseOptionsModule } from 'src/common/database/database.options.module'
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service'

import { APP_LANGUAGE } from 'src/app/constants/app.constant'
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant'
import { ENUM_MESSAGE_LANGUAGE } from './message/constants/message.enum.constant'
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string()
          .valid(...Object.values(ENUM_APP_ENVIRONMENT))
          .default('development')
          .required(),
        APP_LANGUAGE: Joi.string()
          .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
          .default(APP_LANGUAGE)
          .required(),
        APP_TZ: Joi.string().required(),
        APP_MAINTENANCE: Joi.boolean().default(false).required(),

        HTTP_ENABLE: Joi.boolean().default(true).required(),
        HTTP_HOST: [Joi.string().ip({ version: 'ipv4' }).required(), Joi.valid('localhost').required()],
        HTTP_PORT: Joi.number().default(3000).required(),
        HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
        HTTP_VERSION: Joi.number().required(),

        DEBUGGER_WRITE_INTO_FILE: Joi.boolean().default(false).required(),

        JOB_ENABLE: Joi.boolean().default(false).required(),

        DATABASE_HOST: Joi.string().default('mongodb://localhost:27017').required(),
        DATABASE_NAME: Joi.string().default('ain-db').required(),
        DATABASE_USER: Joi.string().allow(null, '').optional(),
        DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
        DATABASE_DEBUG: Joi.boolean().default(false).required(),
        DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),

        SMS_API_KEY: Joi.string().required(),
        OPEN_AI_SECRET_KEY: Joi.string().required(),

        AUTH_JWT_SUBJECT: Joi.string().required(),
        AUTH_JWT_AUDIENCE: Joi.string().required(),
        AUTH_JWT_ISSUER: Joi.string().required(),

        AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string().default('15m').required(),
        AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string().alphanum().min(5).max(50).required(),
        AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string().default('182d').required(),
        AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string().alphanum().min(5).max(50).required(),

        AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean().default(false).required(),
        AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string().allow(null, '').min(20).max(50).optional(),
        AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string().allow(null, '').min(16).max(50).optional(),
        AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string().allow(null, '').min(20).max(50).optional(),
        AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string().allow(null, '').min(16).max(50).optional(),

        AWS_S3_CREDENTIAL_KEY: Joi.string().allow(null, '').optional(),
        AWS_S3_CREDENTIAL_SECRET: Joi.string().allow(null, '').optional(),
        AWS_S3_REGION: Joi.string().allow(null, '').optional(),
        AWS_S3_BUCKET: Joi.string().allow(null, '').optional(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseOptionsModule],
      inject: [DatabaseOptionsService],
      connectionName: DATABASE_CONNECTION_NAME,
      useFactory: (databaseOptionsService: DatabaseOptionsService) => databaseOptionsService.createOptions(),
    }),
    SmsModule,
    PdfModule,
    MessageModule,
    HelperModule,
    PaginationModule,
    ErrorModule,
    ResponseModule,
    RequestModule,
    PolicyModule,
    OpenAIModule,
    AuthModule.forRoot(),
  ],
})
export class CommonModule {}
