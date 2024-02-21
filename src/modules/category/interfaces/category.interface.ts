import { CategoryDoc, CategoryEntity } from '../repository/entities/category.entity'

export interface ICategoryEntity extends Omit<CategoryEntity, 'parentId'> {
  parent: ICategoryEntity
  children: ICategoryEntity[]
}

export interface ICategoryDoc extends Omit<CategoryDoc, 'parentId'> {
  parent: CategoryDoc
  children: CategoryDoc[]
}
