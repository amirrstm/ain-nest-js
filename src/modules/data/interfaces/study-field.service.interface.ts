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

import { StudyFieldCreateDto } from '../dto/study-field.create.dto'
import { StudyFieldDoc } from '../repository/entities/study-field.entity'

export interface IStudyFieldService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<StudyFieldDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<StudyFieldDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: StudyFieldCreateDto, options?: IDatabaseCreateOptions): Promise<StudyFieldDoc>

  delete(repository: StudyFieldDoc, options?: IDatabaseSaveOptions): Promise<StudyFieldDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: StudyFieldCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
