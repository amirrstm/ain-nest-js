import { PipelineStage } from 'mongoose'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseManyOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { UserPlanDoc } from '../repository/entities/user-plan.entity'
import { UserPlanCreateDto } from '../dto/user-plan.create.dto'
import { UserPlanUpdateDto } from '../dto/user-plan.update.dto'

export interface IUserPlanService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findAllExpired(options?: IDatabaseFindAllOptions): Promise<UserPlanDoc[]>

  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<UserPlanDoc>
  findOneByUserId(_id: string, options?: IDatabaseFindOneOptions): Promise<UserPlanDoc>
  findOne(find: PipelineStage, options?: IDatabaseRawFindAllOptions): Promise<UserPlanDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: UserPlanCreateDto, options?: IDatabaseCreateOptions): Promise<UserPlanDoc>
  update(repository: UserPlanDoc, data: UserPlanUpdateDto, options?: IDatabaseSaveOptions): Promise<UserPlanDoc>
  updateExpire(repository: UserPlanDoc, options?: IDatabaseSaveOptions): Promise<UserPlanDoc>

  delete(repository: UserPlanDoc, options?: IDatabaseSaveOptions): Promise<UserPlanDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
}
