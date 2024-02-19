import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
  IDatabaseExistOptions,
} from 'src/common/database/interfaces/database.interface'

import { CategoryDoc } from '../repository/entities/category.entity'
import { CategoryCreateDto } from '../dto/category.create.dto'
import { CategoryUpdateDto } from '../dto/category.update.dto'

export interface ICategoryService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<CategoryDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<CategoryDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  existBySlug(slug: string, options?: IDatabaseExistOptions): Promise<boolean>
  create(data: CategoryCreateDto, options?: IDatabaseCreateOptions): Promise<CategoryDoc>
  update(repository: CategoryDoc, data: CategoryUpdateDto, options?: IDatabaseSaveOptions): Promise<CategoryDoc>

  active(repository: CategoryDoc, options?: IDatabaseSaveOptions): Promise<CategoryDoc>
  inactive(repository: CategoryDoc, options?: IDatabaseSaveOptions): Promise<CategoryDoc>
  delete(repository: CategoryDoc, options?: IDatabaseSaveOptions): Promise<CategoryDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: CategoryCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
