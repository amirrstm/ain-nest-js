import { PipelineStage } from 'mongoose'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { PromptDoc } from '../repository/entities/prompt.entity'
import { PromptCreateDto } from '../dto/prompt.create.dto'
import { PromptUpdateDto } from '../dto/prompt.update.dto'
import { IPromptDoc } from './prompt.interface'

export interface IPromptService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<PromptDoc>
  findOne(find: PipelineStage, options?: IDatabaseRawFindAllOptions): Promise<PromptDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: PromptCreateDto, options?: IDatabaseCreateOptions): Promise<PromptDoc>
  update(repository: PromptDoc, data: PromptUpdateDto, options?: IDatabaseSaveOptions): Promise<PromptDoc>

  active(repository: PromptDoc, options?: IDatabaseSaveOptions): Promise<PromptDoc>
  inactive(repository: PromptDoc, options?: IDatabaseSaveOptions): Promise<PromptDoc>
  delete(repository: PromptDoc, options?: IDatabaseSaveOptions): Promise<PromptDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: PromptCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
  joinWithCategory(repository: PromptDoc): Promise<IPromptDoc>
}
