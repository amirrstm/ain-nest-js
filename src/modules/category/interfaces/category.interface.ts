import { CategoryDoc, CategoryEntity } from '../repository/entities/category.entity'

export interface ICategoryEntity extends Omit<CategoryEntity, 'parentId'> {
  parent: ICategoryEntity
  children: ICategoryEntity[]
}

export interface ICategoryDoc extends Omit<CategoryDoc, 'parentId'> {
  parent: CategoryDoc
  children: CategoryDoc[]
}

export interface ICategoryMeta {
  title?: string
  video?: string
  afterImage?: string
  beforeImage?: string
  description?: string

  seo?: {
    url?: string
    type?: string
    image?: string
    title?: string
    keywords?: string
    description?: string
  }
  guide?: { title?: string; description?: string }[]
}
