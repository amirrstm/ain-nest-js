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

import { IInputDoc } from './prompt.interface'
import { InputCreateDto } from '../dto/input.create.dto'
import { InputUpdateDto } from '../dto/input.update.dto'
import { InputDoc } from '../repository/entities/input.entity'

export interface IInputService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findAllWithTranslation<T>(
    language?: string,
    find?: Record<string, any>,
    options?: IDatabaseRawFindAllOptions
  ): Promise<T[]>

  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<InputDoc>
  findOne(find: PipelineStage, options?: IDatabaseRawFindAllOptions): Promise<InputDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: InputCreateDto, options?: IDatabaseCreateOptions): Promise<InputDoc>
  update(repository: InputDoc, data: InputUpdateDto, options?: IDatabaseSaveOptions): Promise<InputDoc>

  active(repository: InputDoc, options?: IDatabaseSaveOptions): Promise<InputDoc>
  inactive(repository: InputDoc, options?: IDatabaseSaveOptions): Promise<InputDoc>
  delete(repository: InputDoc, options?: IDatabaseSaveOptions): Promise<InputDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: InputCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
  joinWithCategory(repository: InputDoc): Promise<IInputDoc>
}
