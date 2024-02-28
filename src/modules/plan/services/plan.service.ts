import { PipelineStage } from 'mongoose'
import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseCreateManyOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'

import { PlanCreateDto } from '../dto/plan.create.dto'
import { PlanUpdateDto } from '../dto/plan.update.dto'
import { IPlanService } from '../interfaces/plan.service.interface'
import { PlanRepository } from '../repository/repositories/plan.repository'
import { PlanDoc, PlanEntity } from '../repository/entities/plan.entity'

@Injectable()
export class PlanService implements IPlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async findAll<T = PlanDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.planRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = PlanDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.planRepository.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<PlanDoc> {
    return this.planRepository.findOneById<PlanDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<PlanDoc> {
    return this.planRepository.findOne<PlanDoc>(find, options)
  }

  async findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<PlanDoc> {
    return this.planRepository.findOne<PlanDoc>({ name }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.planRepository.getTotal(find, options)
  }

  async existBySlug(slug: string, options?: IDatabaseExistOptions): Promise<boolean> {
    return this.planRepository.exists(
      {
        slug,
      },
      { ...options, withDeleted: true }
    )
  }

  async create(
    { name, slug, description, features, generation, models, offForAnnual, price }: PlanCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<PlanDoc> {
    const create: PlanEntity = new PlanEntity()
    create.name = name
    create.slug = slug
    create.price = price
    create.models = models
    create.isActive = true
    create.features = features
    create.generation = generation
    create.description = description
    create.offForAnnual = offForAnnual

    return this.planRepository.create<PlanEntity>(create, options)
  }

  async update(
    repository: PlanDoc,
    { description, features, generation, models, offForAnnual, price, isActive }: PlanUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<PlanDoc> {
    repository.price = price
    repository.models = models
    repository.features = features
    repository.isActive = isActive
    repository.generation = generation
    repository.description = description
    repository.offForAnnual = offForAnnual

    return this.planRepository.save(repository, options)
  }

  async active(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc> {
    repository.isActive = true

    return this.planRepository.save(repository, options)
  }

  async inactive(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc> {
    repository.isActive = false

    return this.planRepository.save(repository, options)
  }

  async delete(repository: PlanDoc, options?: IDatabaseSaveOptions): Promise<PlanDoc> {
    return this.planRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.planRepository.deleteMany(find, options)
  }

  async createMany(data: PlanCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: PlanEntity[] = data.map(
      ({ name, slug, description, features, generation, models, offForAnnual, price }) => {
        const entity: PlanEntity = new PlanEntity()
        entity.name = name
        entity.slug = slug
        entity.price = price
        entity.models = models
        entity.isActive = true
        entity.features = features
        entity.generation = generation
        entity.description = description
        entity.offForAnnual = offForAnnual

        return entity
      }
    )
    return this.planRepository.createMany<PlanEntity>(create, options)
  }
}
