import { PipelineStage } from 'mongoose'
import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'

import { PromptCreateDto } from '../dto/prompt.create.dto'
import { PromptUpdateDto } from '../dto/prompt.update.dto'
import { IPromptService } from '../interfaces/prompt.service.interface'
import { PromptRepository } from '../repository/repositories/prompt.repository'
import { PromptDoc, PromptEntity } from '../repository/entities/prompt.entity'
import { IPromptDoc } from '../interfaces/prompt.interface'
import { APP_LANGUAGE } from 'src/app/constants/app.constant'

@Injectable()
export class PromptService implements IPromptService {
  constructor(private readonly promptRepository: PromptRepository) {}

  async findAll<T = PromptDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.promptRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = PromptDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.promptRepository.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<PromptDoc> {
    return this.promptRepository.findOneById<PromptDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<PromptDoc> {
    return this.promptRepository.findOne<PromptDoc>(find, options)
  }

  async findAllWithTranslation<T = PromptDoc>(
    language?: string,
    find?: Record<string, any>,
    options?: IDatabaseRawFindAllOptions
  ): Promise<T[]> {
    const defaultLanguage = APP_LANGUAGE
    const nonTranslatedFields = {
      _id: 1,
      isActive: 1,
    }
    return this.promptRepository.rawFindAll(
      [
        {
          $match: find,
        },
        {
          $project: {
            ...nonTranslatedFields,
            description: { $ifNull: [`$description.${language}`, `$description.${defaultLanguage}`] },
          },
        },
      ],
      options
    )
  }

  async findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<PromptDoc> {
    return this.promptRepository.findOne<PromptDoc>({ name }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.promptRepository.getTotal(find, options)
  }

  async create({ category, description }: PromptCreateDto, options?: IDatabaseCreateOptions): Promise<PromptDoc> {
    const create: PromptEntity = new PromptEntity()
    create.isActive = true
    create.category = category
    create.description = description

    return this.promptRepository.create<PromptEntity>(create, options)
  }

  async update(
    repository: PromptDoc,
    { description, isActive }: PromptUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<PromptDoc> {
    repository.isActive = isActive
    repository.description = description

    return this.promptRepository.save(repository, options)
  }

  async active(repository: PromptDoc, options?: IDatabaseSaveOptions): Promise<PromptDoc> {
    repository.isActive = true

    return this.promptRepository.save(repository, options)
  }

  async inactive(repository: PromptDoc, options?: IDatabaseSaveOptions): Promise<PromptDoc> {
    repository.isActive = false

    return this.promptRepository.save(repository, options)
  }

  async delete(repository: PromptDoc, options?: IDatabaseSaveOptions): Promise<PromptDoc> {
    return this.promptRepository.softDelete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.promptRepository.deleteMany(find, options)
  }

  async createMany(data: PromptCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: PromptEntity[] = data.map(({ description, category }) => {
      const entity: PromptEntity = new PromptEntity()

      entity.isActive = true
      entity.category = category
      entity.description = description

      return entity
    })
    return this.promptRepository.createMany<PromptEntity>(create, options)
  }

  async joinWithCategory(repository: PromptDoc): Promise<IPromptDoc> {
    return await repository.populate({
      path: 'category',
      localField: 'category',
      foreignField: '_id',
      model: CategoryEntity.name,
    })
  }
}
