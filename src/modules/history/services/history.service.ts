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

@Injectable()
export class HistoryService implements IHistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async findAll<T = HistoryDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.historyRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = HistoryDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.historyRepository.rawFindAll<T>(find, options)
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
    { category, inputValues, user }: HistoryCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<HistoryDoc> {
    const create: HistoryEntity = new HistoryEntity()
    create.user = user
    create.category = category
    create.inputValues = inputValues

    return this.historyRepository.create<HistoryEntity>(create, options)
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
