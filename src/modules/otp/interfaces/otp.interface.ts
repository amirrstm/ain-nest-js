import { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { OtpDoc, OtpEntity } from '../repository/entities/otp.entity'

export interface IOtpEntity extends Omit<OtpEntity, 'user'> {
  user: UserEntity
}

export interface IOtpDoc extends Omit<OtpDoc, 'user'> {
  user: UserDoc
}
