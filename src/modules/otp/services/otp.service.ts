import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'
import { UserEntity } from 'src/modules/user/repository/entities/user.entity'

import { HelperDateService } from 'src/common/helper/services/helper.date.service'
import { IUserDoc } from 'src/modules/user/interfaces/user.interface'
import { IOtpService } from '../interfaces/otp.service.interface'
import { OtpRepository } from '../repository/repositories/otp.repository'
import { OtpCreateDto } from '../dto/otp.create.dto'
import { OtpDoc, OtpEntity } from '../repository/entities/otp.entity'
import { IOtpDoc } from '../interfaces/otp.interface'
import { OtpUpdateCodeDto } from '../dto/otp.update-code.dto'
import { OTP_DEFAULT_EXPIRATION_IN_MINS } from '../constants/otp.constant'
import { ENUM_OTP_TYPE } from '../constants/otp.enum.constant'

@Injectable()
export class OtpService implements IOtpService {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly helperDateService: HelperDateService
  ) {}

  async findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.otpRepository.findAll<T>(find, {
      ...options,
      join: true,
    })
  }

  async findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T> {
    return this.otpRepository.findOneById<T>(_id, options)
  }

  async findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<T> {
    return this.otpRepository.findOne<T>(find, options)
  }

  async findOneByUser<T>(
    { user, type }: { user: string; type: ENUM_OTP_TYPE },
    options?: IDatabaseFindOneOptions
  ): Promise<T> {
    return this.otpRepository.findOne<T>({ user, type }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.otpRepository.getTotal(find, { ...options, join: true })
  }

  async create({ code, user, type }: OtpCreateDto, options?: IDatabaseCreateOptions): Promise<OtpDoc> {
    const create: OtpEntity = new OtpEntity()
    create.code = code
    create.user = user
    create.type = type
    create.isActive = true
    create.expiredAt = this.helperDateService.forwardInMinutes(OTP_DEFAULT_EXPIRATION_IN_MINS)

    return this.otpRepository.create<OtpEntity>(create, options)
  }

  updateCode(repository: OtpDoc, { code }: OtpUpdateCodeDto, options?: IDatabaseSaveOptions): Promise<OtpDoc> {
    repository.code = code
    repository.expiredAt = this.helperDateService.forwardInMinutes(OTP_DEFAULT_EXPIRATION_IN_MINS)

    return this.otpRepository.save(repository, options)
  }

  async existByUser(user: string, options?: IDatabaseExistOptions<any>): Promise<boolean> {
    return this.otpRepository.exists({ user }, options)
  }

  async delete(repository: OtpDoc, options?: IDatabaseSaveOptions): Promise<OtpDoc> {
    return this.otpRepository.softDelete(repository, options)
  }

  async active(repository: OtpDoc, options?: IDatabaseSaveOptions): Promise<OtpEntity> {
    repository.isActive = true

    return this.otpRepository.save(repository, options)
  }

  async inactive(repository: OtpDoc, options?: IDatabaseSaveOptions): Promise<OtpDoc> {
    repository.isActive = false

    return this.otpRepository.save(repository, options)
  }

  async joinWithUser(repository: OtpDoc): Promise<IOtpDoc> {
    return repository.populate({
      path: 'user',
      localField: 'user',
      foreignField: '_id',
      model: UserEntity.name,
    })
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.otpRepository.deleteMany(find, options)
  }
}
