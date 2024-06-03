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

import { ToneCreateDto } from '../dto/tone.create.dto'
import { ToneDoc } from '../repository/entities/tone.entity'

export interface IToneService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ToneDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ToneDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: ToneCreateDto, options?: IDatabaseCreateOptions): Promise<ToneDoc>

  delete(repository: ToneDoc, options?: IDatabaseSaveOptions): Promise<ToneDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: ToneCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
