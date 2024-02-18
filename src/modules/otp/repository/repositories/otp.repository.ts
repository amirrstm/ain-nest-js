import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

import { OtpDoc, OtpEntity } from '../entities/otp.entity'

@Injectable()
export class OtpRepository extends DatabaseMongoUUIDRepositoryAbstract<OtpEntity, OtpDoc> {
  constructor(
    @DatabaseModel(OtpEntity.name)
    private readonly otpModel: Model<OtpEntity>
  ) {
    super(otpModel, {
      path: 'user',
      localField: 'user',
      foreignField: '_id',
      model: UserEntity.name,
    })
  }
}
