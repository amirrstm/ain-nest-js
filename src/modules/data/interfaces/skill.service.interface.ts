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

import { SkillCreateDto } from '../dto/skill.create.dto'
import { SkillDoc } from '../repository/entities/skill.entity'

export interface ISkillService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  rawFindAll<T>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<SkillDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<SkillDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  create(data: SkillCreateDto, options?: IDatabaseCreateOptions): Promise<SkillDoc>

  delete(repository: SkillDoc, options?: IDatabaseSaveOptions): Promise<SkillDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: SkillCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
