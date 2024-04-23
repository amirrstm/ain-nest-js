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

import { OccupationCreateDto } from '../dto/occupation.create.dto'
import { IOccupationService } from '../interfaces/occupation.service.interface'
import { OccupationRepository } from '../repository/repositories/occupation.repository'
import { OccupationDoc, OccupationEntity } from '../repository/entities/occupation.entity'

@Injectable()
export class OccupationService implements IOccupationService {
  constructor(private readonly occupationRepository: OccupationRepository) {}

  async findAll<T = OccupationDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.occupationRepository.findAll<T>(find, options)
  }

  async getFromApi(query?: string): Promise<OccupationDoc[]> {
    const res: any = await axios.get('https://cvbuilder.me/Builder/GetOccupations', { params: { query } })
    const data: OccupationDoc[] = res.data.suggestions.map(({ value }: { value: string }) => ({ name: value }))

    if (data && data.length) {
      await this.createMany(data)
    }

    return data
  }

  async rawFindAll<T = OccupationDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.occupationRepository.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<OccupationDoc> {
    return this.occupationRepository.findOneById<OccupationDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<OccupationDoc> {
    return this.occupationRepository.findOne<OccupationDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.occupationRepository.getTotal(find, options)
  }

  async create({ name }: OccupationCreateDto, options?: IDatabaseCreateOptions): Promise<OccupationDoc> {
    const create: OccupationEntity = new OccupationEntity()
    create.name = name

    return this.occupationRepository.create<OccupationEntity>(create, options)
  }

  async delete(repository: OccupationDoc, options?: IDatabaseSaveOptions): Promise<OccupationDoc> {
    return this.occupationRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.occupationRepository.deleteMany(find, options)
  }

  async createMany(data: OccupationCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: OccupationEntity[] = data.map(({ name }) => {
      const entity: OccupationEntity = new OccupationEntity()
      entity.name = name

      return entity
    })

    for (const occupation of create) {
      try {
        await this.occupationRepository.create<OccupationEntity>(occupation, options)
      } catch {
        continue
      }
    }

    return true
  }
}
