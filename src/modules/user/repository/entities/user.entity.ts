import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { RoleEntity } from 'src/modules/role/repository/entities/role.entity'
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant'

export const UserDatabaseName = 'users'

@DatabaseEntity({ collection: UserDatabaseName })
export class UserEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: false,
    sparse: true,
    index: true,
    trim: true,
    type: String,
    unique: true,
    maxlength: 100,
  })
  username?: string

  @Prop({
    required: false,
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  firstName: string

  @Prop({
    required: false,
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  lastName: string

  @Prop({
    required: false,
    sparse: true,
    trim: true,
    unique: true,
    type: String,
    maxlength: 15,
  })
  mobileNumber?: string

  @Prop({
    required: false,
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
    type: String,
    maxlength: 100,
  })
  email: string

  @Prop({
    required: true,
    ref: RoleEntity.name,
    index: true,
  })
  role: string

  @Prop({
    required: false,
    type: String,
  })
  password: string

  @Prop({
    required: false,
    type: Date,
  })
  passwordExpired: Date

  @Prop({
    required: false,
    type: Date,
  })
  passwordCreated: Date

  @Prop({
    required: true,
    default: 0,
    type: Number,
  })
  passwordAttempt: number

  @Prop({
    required: true,
    type: Date,
  })
  signUpDate: Date

  @Prop({
    required: true,
    enum: ENUM_USER_SIGN_UP_FROM,
  })
  signUpFrom: ENUM_USER_SIGN_UP_FROM

  @Prop({
    required: false,
    type: String,
  })
  salt: string

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean

  @Prop({
    required: true,
    default: false,
    index: true,
    type: Boolean,
  })
  inactivePermanent: boolean

  @Prop({
    required: false,
    type: Date,
  })
  inactiveDate?: Date

  @Prop({
    required: true,
    default: false,
    index: true,
    type: Boolean,
  })
  blocked: boolean

  @Prop({
    required: false,
    type: Date,
  })
  blockedDate?: Date
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)

export type UserDoc = UserEntity & Document
