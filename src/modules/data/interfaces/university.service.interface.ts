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

import { UniversityCreateDto } from '../dto/university.create.dto'
import { UniversityDoc } from '../repository/entities/university.entity'

export interface IUniversityService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<UniversityDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<UniversityDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: UniversityCreateDto, options?: IDatabaseCreateOptions): Promise<UniversityDoc>

  delete(repository: UniversityDoc, options?: IDatabaseSaveOptions): Promise<UniversityDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: UniversityCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
