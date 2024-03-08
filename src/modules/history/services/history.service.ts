import { PipelineStage } from 'mongoose'
import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { HistoryCreateDto } from '../dto/history.create.dto'

import { IHistoryDoc } from '../interfaces/history.interface'
import { IHistoryService } from '../interfaces/history.service.interface'
import { HistoryRepository } from '../repository/repositories/history.repository'
import { HistoryDoc, HistoryEntity } from '../repository/entities/history.entity'
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity'
import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { InputEntity } from 'src/modules/inputs/repository/entities/input.entity'
import { HistoryUpdateDto } from '../dto/history.update.dto'
import { APP_LANGUAGE } from 'src/app/constants/app.constant'

@Injectable()
export class HistoryService implements IHistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async findAll<T = HistoryDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.historyRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = HistoryDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.historyRepository.rawFindAll<T>(find, options)
  }

  async rawFindAllAndJoin<T = HistoryDoc>(
    language: string,
    find?: Record<string, any>,
    pagination?: { _limit: number; _offset: number },
    options?: IDatabaseRawFindAllOptions
  ): Promise<T[]> {
    const defaultLanguage = APP_LANGUAGE

    const nonTranslatedFields = {
      _id: 1,
      content: 1,
      createdAt: 1,
      'category.slug': 1,
      'category.name': 1,
      'category.description': 1,

      'inputValues.value': 1,
      'inputValues.input.type': 1,
      'inputValues.input.name': 1,
      'inputValues.input.title': 1,
      'inputValues.input.multiline': 1,
      'inputValues.input.description': 1,
    }

    return await this.historyRepository.rawFindAll<T>(
      [
        {
          $match: find,
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: pagination?._offset || 0,
        },
        {
          $limit: pagination?._limit || 10,
        },

        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $addFields: {
            'category.name': { $ifNull: [`$category.name.${language}`, `$category.name.${defaultLanguage}`] },
            'category.description': {
              $ifNull: [`$category.description.${language}`, `$category.description.${defaultLanguage}`],
            },
          },
        },

        {
          $lookup: {
            from: 'category_inputs',
            localField: 'inputValues.input',
            foreignField: '_id',
            as: 'inputValuesData',
          },
        },
        {
          $addFields: {
            inputValues: {
              $map: {
                input: '$inputValues',
                as: 'inputValue',
                in: {
                  value: '$$inputValue.value',

                  input: {
                    $mergeObjects: [
                      {
                        type: {
                          $let: {
                            vars: {
                              idx: { $indexOfArray: ['$inputValues.input', '$$inputValue.input'] },
                            },
                            in: {
                              $arrayElemAt: [`$inputValuesData.type`, '$$idx'],
                            },
                          },
                        },

                        multiline: {
                          $let: {
                            vars: {
                              idx: { $indexOfArray: ['$inputValues.input', '$$inputValue.input'] },
                            },
                            in: {
                              $arrayElemAt: [`$inputValuesData.multiline`, '$$idx'],
                            },
                          },
                        },

                        name: {
                          $let: {
                            vars: {
                              idx: { $indexOfArray: ['$inputValues.input', '$$inputValue.input'] },
                            },
                            in: {
                              $arrayElemAt: [`$inputValuesData.name`, '$$idx'],
                            },
                          },
                        },

                        title: {
                          $let: {
                            vars: {
                              idx: { $indexOfArray: ['$inputValues.input', '$$inputValue.input'] },
                            },
                            in: {
                              $arrayElemAt: [`$inputValuesData.title.${language}`, '$$idx'],
                            },
                          },
                        },

                        description: {
                          $let: {
                            vars: {
                              idx: { $indexOfArray: ['$inputValues.input', '$$inputValue.input'] },
                            },
                            in: {
                              $arrayElemAt: [`$inputValuesData.description.${language}`, '$$idx'],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },

        {
          $project: {
            ...nonTranslatedFields,
          },
        },
      ],
      options
    )
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<HistoryDoc> {
    return this.historyRepository.findOneById<HistoryDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<HistoryDoc> {
    return this.historyRepository.findOne<HistoryDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.historyRepository.getTotal(find, options)
  }

  async create(
    { category, inputValues, user, content }: HistoryCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<HistoryDoc> {
    const create: HistoryEntity = new HistoryEntity()
    create.user = user
    create.content = content
    create.category = category
    create.inputValues = inputValues

    return this.historyRepository.create<HistoryEntity>(create, options)
  }

  async update(
    repository: HistoryDoc,
    { content, rawContent }: HistoryUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<HistoryDoc> {
    repository.content = content
    repository.rawContent = rawContent

    return this.historyRepository.save(repository, options)
  }

  async delete(repository: HistoryDoc, options?: IDatabaseSaveOptions): Promise<HistoryDoc> {
    return this.historyRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.historyRepository.deleteMany(find, options)
  }

  async joinWithProperty(repository: HistoryDoc): Promise<IHistoryDoc> {
    return repository.populate([
      {
        path: 'inputValues.input',
        localField: 'inputValues.input',
        foreignField: '_id',
        model: InputEntity.name,
      },
      {
        path: 'category',
        localField: 'category',
        foreignField: '_id',
        model: CategoryEntity.name,
      },
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
