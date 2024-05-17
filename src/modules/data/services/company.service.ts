import axios from 'axios'
import { PipelineStage } from 'mongoose'
import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { CompanyCreateDto } from '../dto/company.create.dto'
import { ICompanyService } from '../interfaces/company.service.interface'
import { CompanyRepository } from '../repository/repositories/company.repository'
import { CompanyDoc, CompanyEntity } from '../repository/entities/company.entity'

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(private readonly companyRepo: CompanyRepository) {}

  async findAll<T = CompanyDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.companyRepo.findAll<T>(find, options)
  }

  async getFromApi(query?: string): Promise<CompanyDoc[]> {
    const res: any = await axios.get('https://cvbuilder.me/Builder/GetCompanies', { params: { query } })
    const data: CompanyDoc[] = res.data.suggestions.map(({ value }: { value: string }) => ({ name: value }))

    if (data && data.length) {
      await this.createMany(data)
    }

    return data
  }

  async rawFindAll<T = CompanyDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.companyRepo.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<CompanyDoc> {
    return this.companyRepo.findOneById<CompanyDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<CompanyDoc> {
    return this.companyRepo.findOne<CompanyDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.companyRepo.getTotal(find, options)
  }

  async create({ name }: CompanyCreateDto, options?: IDatabaseCreateOptions): Promise<CompanyDoc> {
    const create: CompanyEntity = new CompanyEntity()
    create.name = name

    return this.companyRepo.create<CompanyEntity>(create, options)
  }

  async delete(repository: CompanyDoc, options?: IDatabaseSaveOptions): Promise<CompanyDoc> {
    return this.companyRepo.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.companyRepo.deleteMany(find, options)
  }

  async createMany(data: CompanyCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: CompanyEntity[] = data.map(({ name }) => {
      const entity: CompanyEntity = new CompanyEntity()
      entity.name = name

      return entity
    })

    for (const company of create) {
      try {
        await this.companyRepo.create<CompanyEntity>(company, options)
      } catch {
        continue
      }
    }

    return true
  }
}
