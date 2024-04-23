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

import { OccupationCreateDto } from '../dto/occupation.create.dto'
import { OccupationDoc } from '../repository/entities/occupation.entity'

export interface IOccupationService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<OccupationDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<OccupationDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: OccupationCreateDto, options?: IDatabaseCreateOptions): Promise<OccupationDoc>

  delete(repository: OccupationDoc, options?: IDatabaseSaveOptions): Promise<OccupationDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: OccupationCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
