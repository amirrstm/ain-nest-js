import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'
import { UserEntity } from 'src/modules/user/repository/entities/user.entity'

import { CategoryRequestCreateDto } from '../dto/category-request.create.dto'
import { ICategoryRequestDoc } from '../interfaces/category-request.interface'
import { CategoryRequestUpdateDto } from '../dto/category-request.update.dto'
import { ICategoryRequestService } from '../interfaces/category-request.service.interface'
import { CategoryRequestDoc, CategoryRequestEntity } from '../repository/entities/category-request.entity'
import { CategoryRequestRepository } from '../repository/repositories/category-request.repository'

@Injectable()
export class CategoryRequestService implements ICategoryRequestService {
  constructor(private readonly requestRepository: CategoryRequestRepository) {}

  async findAll<T = CategoryRequestDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.requestRepository.findAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<CategoryRequestDoc> {
    return this.requestRepository.findOneById<CategoryRequestDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<CategoryRequestDoc> {
    return this.requestRepository.findOne<CategoryRequestDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.requestRepository.getTotal(find, options)
  }

  async create(
    { user, description, name }: CategoryRequestCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<CategoryRequestDoc> {
    const create: CategoryRequestEntity = new CategoryRequestEntity()
    create.user = user
    create.name = name
    create.description = description

    return this.requestRepository.create<CategoryRequestEntity>(create, options)
  }

  async update(
    repository: CategoryRequestDoc,
    { name, description }: CategoryRequestUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<CategoryRequestDoc> {
    repository.name = name
    repository.description = description

    return this.requestRepository.save(repository, options)
  }

  async delete(repository: CategoryRequestDoc, options?: IDatabaseSaveOptions): Promise<CategoryRequestDoc> {
    return this.requestRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.requestRepository.deleteMany(find, options)
  }

  async joinWithProperty(repository: CategoryRequestDoc): Promise<ICategoryRequestDoc> {
    return repository.populate([
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
        select: ['_id', 'mobileNumber', 'email'],
      },
    ])
  }
}
