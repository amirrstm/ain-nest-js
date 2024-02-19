import {
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'

import { IOtpDoc } from './otp.interface'
import { OtpCreateDto } from '../dto/otp.create.dto'
import { OtpDoc, OtpEntity } from '../repository/entities/otp.entity'
import { OtpUpdateCodeDto } from '../dto/otp.update-code.dto'
import { ENUM_OTP_TYPE } from '../constants/otp.enum.constant'

export interface IOtpService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T>
  findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<T>
  findOneByUser<T>(find: { user: string; type: ENUM_OTP_TYPE }, options?: IDatabaseFindOneOptions): Promise<T>
  existByUser(user: string, options?: IDatabaseExistOptions): Promise<boolean>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>

  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create({ code, user }: OtpCreateDto, options?: IDatabaseCreateOptions): Promise<OtpDoc>
  delete(repository: OtpDoc, options?: IDatabaseSaveOptions): Promise<OtpDoc>
  active(repository: OtpDoc, options?: IDatabaseSaveOptions): Promise<OtpEntity>
  inactive(repository: OtpDoc, options?: IDatabaseSaveOptions): Promise<OtpDoc>
  updateCode(repository: OtpDoc, { code }: OtpUpdateCodeDto, options?: IDatabaseSaveOptions): Promise<OtpDoc>
  joinWithUser(repository: OtpDoc): Promise<IOtpDoc>
}
