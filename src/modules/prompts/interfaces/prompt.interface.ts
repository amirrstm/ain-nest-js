import { ICategoryDoc, ICategoryEntity } from 'src/modules/category/interfaces/category.interface'

import { PromptDoc, PromptEntity } from '../repository/entities/prompt.entity'

export interface IPromptEntity extends Omit<PromptEntity, 'category'> {
  category: ICategoryEntity
}

export interface IPromptDoc extends Omit<PromptDoc, 'category'> {
  category: ICategoryDoc
}
