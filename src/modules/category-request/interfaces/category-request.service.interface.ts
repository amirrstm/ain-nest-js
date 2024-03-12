import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'

import { CategoryRequestDoc } from '../repository/entities/category-request.entity'
import { CategoryRequestCreateDto } from '../dto/category-request.create.dto'
import { CategoryRequestUpdateDto } from '../dto/category-request.update.dto'

export interface ICategoryRequestService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<CategoryRequestDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<CategoryRequestDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: CategoryRequestCreateDto, options?: IDatabaseCreateOptions): Promise<CategoryRequestDoc>
  delete(repository: CategoryRequestDoc, options?: IDatabaseSaveOptions): Promise<CategoryRequestDoc>
  update(
    repository: CategoryRequestDoc,
    data: CategoryRequestUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<CategoryRequestDoc>
}
