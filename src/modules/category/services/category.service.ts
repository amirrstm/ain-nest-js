import { PipelineStage } from 'mongoose'
import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { CategoryCreateDto } from '../dto/category.create.dto'
import { CategoryUpdateDto } from '../dto/category.update.dto'
import { ICategoryService } from '../interfaces/category.service.interface'
import { CategoryRepository } from '../repository/repositories/category.repository'
import { CategoryDoc, CategoryEntity } from '../repository/entities/category.entity'

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll<T = CategoryDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.categoryRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = CategoryDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.categoryRepository.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<CategoryDoc> {
    return this.categoryRepository.findOneById<CategoryDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<CategoryDoc> {
    return this.categoryRepository.findOne<CategoryDoc>(find, options)
  }

  async findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<CategoryDoc> {
    return this.categoryRepository.findOne<CategoryDoc>({ name }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.categoryRepository.getTotal(find, options)
  }

  async existBySlug(slug: string, options?: IDatabaseExistOptions): Promise<boolean> {
    return this.categoryRepository.exists(
      {
        slug,
      },
      { ...options, withDeleted: true }
    )
  }

  async create(
    { name, slug, parentId, description, maxTokens, meta }: CategoryCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<CategoryDoc> {
    const create: CategoryEntity = new CategoryEntity()
    create.name = name
    create.slug = slug
    create.meta = meta
    create.isActive = true
    create.parentId = parentId
    create.maxTokens = maxTokens
    create.description = description

    return this.categoryRepository.create<CategoryEntity>(create, options)
  }

  async update(
    repository: CategoryDoc,
    { name, description, isActive, meta }: CategoryUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<CategoryDoc> {
    repository.name = name
    repository.meta = meta
    repository.isActive = isActive
    repository.description = description

    return this.categoryRepository.save(repository, options)
  }

  async active(repository: CategoryDoc, options?: IDatabaseSaveOptions): Promise<CategoryDoc> {
    repository.isActive = true

    return this.categoryRepository.save(repository, options)
  }

  async inactive(repository: CategoryDoc, options?: IDatabaseSaveOptions): Promise<CategoryDoc> {
    repository.isActive = false

    return this.categoryRepository.save(repository, options)
  }

  async delete(repository: CategoryDoc, options?: IDatabaseSaveOptions): Promise<CategoryDoc> {
    return this.categoryRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.categoryRepository.deleteMany(find, options)
  }

  async createMany(data: CategoryCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: CategoryEntity[] = data.map(({ name, description, parentId, slug, maxTokens, meta }) => {
      const entity: CategoryEntity = new CategoryEntity()
      entity.name = name
      entity.slug = slug
      entity.meta = meta
      entity.isActive = true
      entity.parentId = parentId
      entity.maxTokens = maxTokens
      entity.description = description

      return entity
    })
    return this.categoryRepository.createMany<CategoryEntity>(create, options)
  }
}
