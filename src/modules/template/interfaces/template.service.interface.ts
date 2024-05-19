import {
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'

import { TemplateCreateDto } from '../dtos/template.create.dto'
import { TemplateUpdateDto } from '../dtos/template.update.dto'
import { TemplateDoc } from '../repository/entities/template.entity'

export interface ITemplateService {
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<TemplateDoc>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<TemplateDoc>
  findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<TemplateDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>
  existByName(name: string, options?: IDatabaseExistOptions): Promise<boolean>
  create(data: TemplateCreateDto, options?: IDatabaseCreateOptions): Promise<TemplateDoc>
  update(repository: TemplateDoc, data: TemplateUpdateDto, options?: IDatabaseSaveOptions): Promise<TemplateDoc>
  active(repository: TemplateDoc, options?: IDatabaseSaveOptions): Promise<TemplateDoc>
  inactive(repository: TemplateDoc, options?: IDatabaseSaveOptions): Promise<TemplateDoc>
  delete(repository: TemplateDoc, options?: IDatabaseSaveOptions): Promise<TemplateDoc>
  deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean>
  createMany(data: TemplateCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean>
}
