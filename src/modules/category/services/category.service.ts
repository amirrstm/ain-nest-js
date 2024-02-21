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

import { ICategoryService } from '../interfaces/category.service.interface'
import { CategoryDoc, CategoryEntity } from '../repository/entities/category.entity'
import { CategoryCreateDto } from '../dto/category.create.dto'
import { CategoryRepository } from '../repository/repositories/category.repository'
import { CategoryUpdateDto } from '../dto/category.update.dto'
import { PipelineStage } from 'mongoose'

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
    { name, slug, parentId, description }: CategoryCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<CategoryDoc> {
    const create: CategoryEntity = new CategoryEntity()
    create.name = name
    create.slug = slug
    create.parentId = parentId
    create.isActive = true
    create.description = description

    return this.categoryRepository.create<CategoryEntity>(create, options)
  }

  async update(
    repository: CategoryDoc,
    { name, description, isActive }: CategoryUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<CategoryDoc> {
    repository.name = name
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
    const create: CategoryEntity[] = data.map(({ name, description, parentId, slug }) => {
      const entity: CategoryEntity = new CategoryEntity()
      entity.name = name
      entity.slug = slug
      entity.parentId = parentId
      entity.description = description
      entity.isActive = true

      return entity
    })
    return this.categoryRepository.createMany<CategoryEntity>(create, options)
  }
}
