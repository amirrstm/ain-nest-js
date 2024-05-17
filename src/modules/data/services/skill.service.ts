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

import { SkillCreateDto } from '../dto/skill.create.dto'
import { ISkillService } from '../interfaces/skill.service.interface'
import { SkillRepository } from '../repository/repositories/skill.repository'
import { SkillDoc, SkillEntity } from '../repository/entities/skill.entity'

@Injectable()
export class SkillService implements ISkillService {
  constructor(private readonly skillRepo: SkillRepository) {}

  async findAll<T = SkillDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.skillRepo.findAll<T>(find, options)
  }

  async getFromApi(query?: string): Promise<SkillDoc[]> {
    const res: any = await axios.get('https://cvbuilder.me/Builder/Software', { params: { query } })
    const data: SkillDoc[] = res.data.suggestions.map(({ value }: { value: string }) => ({ name: value }))

    if (data && data.length) {
      await this.createMany(data)
    }

    return data
  }

  async rawFindAll<T = SkillDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.skillRepo.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<SkillDoc> {
    return this.skillRepo.findOneById<SkillDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<SkillDoc> {
    return this.skillRepo.findOne<SkillDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.skillRepo.getTotal(find, options)
  }

  async create({ name }: SkillCreateDto, options?: IDatabaseCreateOptions): Promise<SkillDoc> {
    const create: SkillEntity = new SkillEntity()
    create.name = name

    return this.skillRepo.create<SkillEntity>(create, options)
  }

  async delete(repository: SkillDoc, options?: IDatabaseSaveOptions): Promise<SkillDoc> {
    return this.skillRepo.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.skillRepo.deleteMany(find, options)
  }

  async createMany(data: SkillCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: SkillEntity[] = data.map(({ name }) => {
      const entity: SkillEntity = new SkillEntity()
      entity.name = name

      return entity
    })

    for (const skill of create) {
      try {
        await this.skillRepo.create<SkillEntity>(skill, options)
      } catch {
        continue
      }
    }

    return true
  }
}
