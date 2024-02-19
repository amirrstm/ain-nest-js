import { CategoryDoc, CategoryEntity } from '../repository/entities/category.entity'

export interface ICategoryEntity extends Omit<CategoryEntity, 'category'> {
  category: CategoryEntity
}

export interface ICategoryDoc extends Omit<CategoryDoc, 'category'> {
  category: CategoryDoc
}
