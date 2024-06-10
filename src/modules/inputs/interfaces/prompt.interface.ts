import { ICategoryDoc, ICategoryEntity } from 'src/modules/category/interfaces/category.interface'
import { InputDoc, InputEntity } from '../repository/entities/input.entity'

export interface IInputEntity extends Omit<InputEntity, 'category'> {
  category: ICategoryEntity
}

export interface IInputDoc extends Omit<InputDoc, 'category' | 'description'> {
  category: ICategoryDoc
  description: string
}
