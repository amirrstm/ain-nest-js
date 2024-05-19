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
} from 'src/common/database/interfaces/database.interface'

import { TemplateCreateDto } from '../dtos/template.create.dto'
import { TemplateUpdateDto } from '../dtos/template.update.dto'
import { ITemplateService } from '../interfaces/template.service.interface'
import { TemplateDoc, TemplateEntity } from '../repository/entities/template.entity'
import { TemplateRepository } from '../repository/repositories/template.repository'

@Injectable()
export class TemplateService implements ITemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  async findAll<T = TemplateDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.templateRepository.findAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<TemplateDoc> {
    return this.templateRepository.findOneById<TemplateDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<TemplateDoc> {
    return this.templateRepository.findOne<TemplateDoc>(find, options)
  }

  async findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<TemplateDoc> {
    return this.templateRepository.findOne<TemplateDoc>({ name }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.templateRepository.getTotal(find, options)
  }

  async existByName(name: string, options?: IDatabaseExistOptions): Promise<boolean> {
    return this.templateRepository.exists(
      {
        name,
      },
      { ...options, withDeleted: true }
    )
  }

  async create(
    { name, description, lang, type, image, path, defaultSettings }: TemplateCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<TemplateDoc> {
    const create: TemplateEntity = new TemplateEntity()
    create.name = name
    create.type = type
    create.path = path
    create.lang = lang
    create.image = image
    create.isActive = true
    create.description = description
    create.defaultSettings = defaultSettings

    return this.templateRepository.create<TemplateEntity>(create, options)
  }

  async update(
    repository: TemplateDoc,
    { description, image, path, defaultSettings }: TemplateUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<TemplateDoc> {
    repository.path = path
    repository.image = image
    repository.description = description
    repository.defaultSettings = defaultSettings

    return this.templateRepository.save(repository, options)
  }

  async active(repository: TemplateDoc, options?: IDatabaseSaveOptions): Promise<TemplateDoc> {
    repository.isActive = true

    return this.templateRepository.save(repository, options)
  }

  async inactive(repository: TemplateDoc, options?: IDatabaseSaveOptions): Promise<TemplateDoc> {
    repository.isActive = false

    return this.templateRepository.save(repository, options)
  }

  async delete(repository: TemplateDoc, options?: IDatabaseSaveOptions): Promise<TemplateDoc> {
    return this.templateRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.templateRepository.deleteMany(find, options)
  }

  async createMany(data: TemplateCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: TemplateEntity[] = data.map(({ type, name, lang, description, image, path, defaultSettings }) => {
      const entity: TemplateEntity = new TemplateEntity()
      entity.type = type
      entity.name = name
      entity.path = path
      entity.lang = lang
      entity.image = image
      entity.isActive = true
      entity.description = description
      entity.defaultSettings = defaultSettings

      return entity
    })
    return this.templateRepository.createMany<TemplateEntity>(create, options)
  }
}
