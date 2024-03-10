import { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { CategoryDoc, CategoryEntity } from 'src/modules/category/repository/entities/category.entity'

import { HistoryDoc, HistoryEntity } from '../repository/entities/history.entity'

export interface IHistoryEntity extends Omit<HistoryEntity, 'user' | 'category'> {
  user: UserEntity
  category: CategoryEntity
}

export interface IHistoryDoc extends Omit<HistoryDoc, 'user' | 'category'> {
  user: UserDoc
  category: CategoryDoc
}

export interface IHistoryInputValues {
  input: string
  value: string
}

export interface IHistoryFeedback {
  text?: string
  liked: boolean
}
