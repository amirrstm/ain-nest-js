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

import { UniversityCreateDto } from '../dto/university.create.dto'
import { IUniversityService } from '../interfaces/university.service.interface'
import { UniversityRepository } from '../repository/repositories/university.repository'
import { UniversityDoc, UniversityEntity } from '../repository/entities/university.entity'

@Injectable()
export class UniversityService implements IUniversityService {
  constructor(private readonly universityRepo: UniversityRepository) {}

  async findAll<T = UniversityDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.universityRepo.findAll<T>(find, options)
  }

  async getFromApi(query?: string): Promise<UniversityDoc[]> {
    const res: any = await axios.get('https://cvbuilder.me/Builder/GetUniversities', { params: { query } })
    const data: UniversityDoc[] = res.data.suggestions.map(({ value }: { value: string }) => ({ name: value }))

    if (data && data.length) {
      await this.createMany(data)
    }

    return data
  }

  async rawFindAll<T = UniversityDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.universityRepo.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<UniversityDoc> {
    return this.universityRepo.findOneById<UniversityDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<UniversityDoc> {
    return this.universityRepo.findOne<UniversityDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.universityRepo.getTotal(find, options)
  }

  async create({ name }: UniversityCreateDto, options?: IDatabaseCreateOptions): Promise<UniversityDoc> {
    const create: UniversityEntity = new UniversityEntity()
    create.name = name

    return this.universityRepo.create<UniversityEntity>(create, options)
  }

  async delete(repository: UniversityDoc, options?: IDatabaseSaveOptions): Promise<UniversityDoc> {
    return this.universityRepo.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.universityRepo.deleteMany(find, options)
  }

  async createMany(data: UniversityCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: UniversityEntity[] = data.map(({ name }) => {
      const entity: UniversityEntity = new UniversityEntity()
      entity.name = name

      return entity
    })

    for (const uniField of create) {
      try {
        await this.universityRepo.create<UniversityEntity>(uniField, options)
      } catch {
        continue
      }
    }

    return true
  }
}
