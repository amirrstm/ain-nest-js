import { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity'

import { CategoryRequestDoc, CategoryRequestEntity } from '../repository/entities/category-request.entity'

export interface ICategoryRequestEntity extends Omit<CategoryRequestEntity, 'user'> {
  user: UserEntity
}

export interface ICategoryRequestDoc extends Omit<CategoryRequestDoc, 'user'> {
  user: UserDoc
}
