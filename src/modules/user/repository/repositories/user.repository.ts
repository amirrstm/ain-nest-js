import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

import { RoleEntity } from 'src/modules/role/repository/entities/role.entity'
import { DatabaseModel } from 'src/common/database/decorators/database.decorator'
import { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract'

@Injectable()
export class UserRepository extends DatabaseMongoUUIDRepositoryAbstract<UserEntity, UserDoc> {
  constructor(
    @DatabaseModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>
  ) {
    super(userModel, {
      path: 'role',
      localField: 'role',
      foreignField: '_id',
      model: RoleEntity.name,
    })
  }
}
