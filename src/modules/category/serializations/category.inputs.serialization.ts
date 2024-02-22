import { InputGetSerialization } from 'src/modules/inputs/serializations/input.get.serialization'
import { CategoryGetSerialization } from './category.get.serialization'

export class CategoryInputSerialization extends CategoryGetSerialization {
  inputs: InputGetSerialization[]
}
