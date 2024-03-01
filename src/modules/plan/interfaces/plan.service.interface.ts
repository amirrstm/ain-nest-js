import { PipelineStage } from 'mongoose'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
  IDatabaseExistOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { PlanDoc } from '../repository/entities/plan.entity'
import { PlanCreateDto } from '../dto/plan.create.dto'
import { PlanUpdateDto } from '../dto/plan.update.dto'

export interface IPlanService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<PlanDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<PlanDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  existBySlug(slug: string, options?: IDatabaseExistOptions): Promise<boolean>
  findDefault(options?: IDatabaseExistOptions): Promise<PlanDoc>
  create(data: PlanCreateDto, options?: IDatabaseCreateOptions): Promise<PlanDoc>
  update(repository: PlanDoc, data: PlanUpdateDto, options?: IDatabaseSaveOptions): Promise<PlanDoc>

  active(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc>
  inactive(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc>
  delete(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: PlanCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
  makeDefault(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc>
  removeDefault(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc>
}
