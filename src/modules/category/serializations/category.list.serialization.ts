import { ApiProperty } from '@nestjs/swagger'
import { CategoryGetSerialization } from './category.get.serialization'
import { Transform } from 'class-transformer'

export class CategoryListSerialization extends CategoryGetSerialization {}
