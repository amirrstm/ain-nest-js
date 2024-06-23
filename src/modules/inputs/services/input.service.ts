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

import { InputCreateDto } from '../dto/input.create.dto'
import { InputUpdateDto } from '../dto/input.update.dto'
import { IInputService } from '../interfaces/prompt.service.interface'
import { InputRepository } from '../repository/repositories/input.repository'
import { InputDoc, InputEntity } from '../repository/entities/input.entity'
import { IInputDoc } from '../interfaces/prompt.interface'
import { APP_LANGUAGE } from 'src/app/constants/app.constant'

@Injectable()
export class InputService implements IInputService {
  constructor(private readonly inputRepository: InputRepository) {}

  async findAll<T = InputDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.inputRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = InputDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.inputRepository.rawFindAll<T>(find, options)
  }

  async findAllWithTranslation<T = InputDoc>(
    language?: string,
    find?: Record<string, any>,
    options?: IDatabaseRawFindAllOptions
  ): Promise<T[]> {
    const defaultLanguage = APP_LANGUAGE
    const nonTranslatedFields = {
      _id: 1,
      type: 1,
      name: 1,
      isActive: 1,
      category: 1,
      multiline: 1,
      isRequired: 1,
    }

    return await this.inputRepository.rawFindAll(
      [
        {
          $match: find,
        },
        {
          $project: {
            ...nonTranslatedFields,
            title: { $ifNull: [`$title.${language}`, `$title.${defaultLanguage}`] },
            placeholder: { $ifNull: [`$placeholder.${language}`, `$placeholder.${defaultLanguage}`] },
            description: { $ifNull: [`$description.${language}`, `$description.${defaultLanguage}`] },
          },
        },
      ],
      options
    )
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<InputDoc> {
    return this.inputRepository.findOneById<InputDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<InputDoc> {
    return this.inputRepository.findOne<InputDoc>(find, options)
  }

  async findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<InputDoc> {
    return this.inputRepository.findOne<InputDoc>({ name }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.inputRepository.getTotal(find, options)
  }

  async create(
    { category, description, multiline, isRequired, name, placeholder, title, type }: InputCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<InputDoc> {
    const create: InputEntity = new InputEntity()
    create.isActive = true
    create.name = name
    create.type = type
    create.title = title
    create.category = category
    create.multiline = multiline
    create.isRequired = isRequired
    create.description = description
    create.placeholder = placeholder

    return this.inputRepository.create<InputEntity>(create, options)
  }

  async update(
    repository: InputDoc,
    { description, isActive, multiline, name, placeholder, title, isRequired }: InputUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<InputDoc> {
    repository.name = name
    repository.title = title
    repository.isActive = isActive
    repository.multiline = multiline
    repository.isRequired = isRequired
    repository.placeholder = placeholder
    repository.description = description

    return this.inputRepository.save(repository, options)
  }

  async active(repository: InputDoc, options?: IDatabaseSaveOptions): Promise<InputDoc> {
    repository.isActive = true

    return this.inputRepository.save(repository, options)
  }

  async inactive(repository: InputDoc, options?: IDatabaseSaveOptions): Promise<InputDoc> {
    repository.isActive = false

    return this.inputRepository.save(repository, options)
  }

  async delete(repository: InputDoc, options?: IDatabaseSaveOptions): Promise<InputDoc> {
    return this.inputRepository.softDelete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.inputRepository.deleteMany(find, options)
  }

  async createMany(data: InputCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: InputEntity[] = data.map(({ category, description, multiline, name, placeholder, title, type }) => {
      const entity: InputEntity = new InputEntity()
      entity.isActive = true
      entity.name = name
      entity.type = type
      entity.title = title
      entity.category = category
      entity.multiline = multiline
      entity.description = description
      entity.placeholder = placeholder

      return entity
    })
    return this.inputRepository.createMany<InputEntity>(create, options)
  }

  async joinWithCategory(repository: InputDoc): Promise<IInputDoc> {
    return await repository.populate({
      path: 'category',
      localField: 'category',
      foreignField: '_id',
      model: CategoryEntity.name,
    })
  }
}
