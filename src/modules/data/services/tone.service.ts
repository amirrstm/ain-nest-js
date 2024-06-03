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

import { ToneCreateDto } from '../dto/tone.create.dto'
import { IToneService } from '../interfaces/tone.service.interface'
import { ToneRepository } from '../repository/repositories/tone.repository'
import { ToneDoc, ToneEntity } from '../repository/entities/tone.entity'

@Injectable()
export class ToneService implements IToneService {
  constructor(private readonly toneRepo: ToneRepository) {}

  async findAll<T = ToneDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.toneRepo.findAll<T>(find, options)
  }

  async rawFindAll<T = ToneDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.toneRepo.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ToneDoc> {
    return this.toneRepo.findOneById<ToneDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ToneDoc> {
    return this.toneRepo.findOne<ToneDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.toneRepo.getTotal(find, options)
  }

  async create({ name }: ToneCreateDto, options?: IDatabaseCreateOptions): Promise<ToneDoc> {
    const create: ToneEntity = new ToneEntity()
    create.name = name

    return this.toneRepo.create<ToneEntity>(create, options)
  }

  async delete(repository: ToneDoc, options?: IDatabaseSaveOptions): Promise<ToneDoc> {
    return this.toneRepo.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.toneRepo.deleteMany(find, options)
  }

  async createMany(data: ToneCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: ToneEntity[] = data.map(({ name }) => {
      const entity: ToneEntity = new ToneEntity()
      entity.name = name

      return entity
    })
    return this.toneRepo.createMany<ToneEntity>(create, options)
  }
}
