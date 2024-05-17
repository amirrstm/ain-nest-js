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

import { CompanyCreateDto } from '../dto/company.create.dto'
import { CompanyDoc } from '../repository/entities/company.entity'

export interface ICompanyService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<CompanyDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<CompanyDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: CompanyCreateDto, options?: IDatabaseCreateOptions): Promise<CompanyDoc>

  delete(repository: CompanyDoc, options?: IDatabaseSaveOptions): Promise<CompanyDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: CompanyCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
