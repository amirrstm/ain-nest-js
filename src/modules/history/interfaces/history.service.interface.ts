import { PipelineStage } from 'mongoose'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { HistoryDoc } from '../repository/entities/history.entity'
import { HistoryCreateDto } from '../dto/history.create.dto'
import { HistoryUpdateDto } from '../dto/history.update.dto'

export interface IHistoryService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<HistoryDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<HistoryDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: HistoryCreateDto, options?: IDatabaseCreateOptions): Promise<HistoryDoc>
  delete(repository: HistoryDoc, options?: IDatabaseSaveOptions): Promise<HistoryDoc>
  update(repository: HistoryDoc, data: HistoryUpdateDto, options?: IDatabaseSaveOptions): Promise<HistoryDoc>
}
