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

import { ProvinceDoc } from '../repository/entities/province.entity'
import { ProvinceCreateDto } from '../dto/province.create.dto'

export interface IProvinceService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ProvinceDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ProvinceDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: ProvinceCreateDto, options?: IDatabaseCreateOptions): Promise<ProvinceDoc>

  delete(repository: ProvinceDoc, options?: IDatabaseSaveOptions): Promise<ProvinceDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: ProvinceCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
