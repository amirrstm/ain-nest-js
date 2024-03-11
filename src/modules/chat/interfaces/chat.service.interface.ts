import { PipelineStage } from 'mongoose'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { ChatDoc } from '../repository/entities/chat.entity'
import { ChatCreateDto } from '../dto/chat.create.dto'
import { ChatUpdateDto } from '../dto/chat.update.dto'

export interface IChatService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ChatDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ChatDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: ChatCreateDto, options?: IDatabaseCreateOptions): Promise<ChatDoc>
  delete(repository: ChatDoc, options?: IDatabaseSaveOptions): Promise<ChatDoc>
  update(repository: ChatDoc, data: ChatUpdateDto, options?: IDatabaseSaveOptions): Promise<ChatDoc>
}
