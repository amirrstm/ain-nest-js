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

import { StudyFieldCreateDto } from '../dto/study-field.create.dto'
import { IStudyFieldService } from '../interfaces/study-field.service.interface'
import { StudyFieldRepository } from '../repository/repositories/study-field.repository'
import { StudyFieldDoc, StudyFieldEntity } from '../repository/entities/study-field.entity'

@Injectable()
export class StudyFieldService implements IStudyFieldService {
  constructor(private readonly studyFieldRepo: StudyFieldRepository) {}

  async findAll<T = StudyFieldDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.studyFieldRepo.findAll<T>(find, options)
  }

  async getFromApi(query?: string): Promise<StudyFieldDoc[]> {
    const res: any = await axios.get('https://cvbuilder.me/Builder/FieldOfStudy', { params: { query } })
    const data: StudyFieldDoc[] = res.data.suggestions.map(({ value }: { value: string }) => ({ name: value }))

    if (data && data.length) {
      await this.createMany(data)
    }

    return data
  }

  async rawFindAll<T = StudyFieldDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.studyFieldRepo.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<StudyFieldDoc> {
    return this.studyFieldRepo.findOneById<StudyFieldDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<StudyFieldDoc> {
    return this.studyFieldRepo.findOne<StudyFieldDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.studyFieldRepo.getTotal(find, options)
  }

  async create({ name }: StudyFieldCreateDto, options?: IDatabaseCreateOptions): Promise<StudyFieldDoc> {
    const create: StudyFieldEntity = new StudyFieldEntity()
    create.name = name

    return this.studyFieldRepo.create<StudyFieldEntity>(create, options)
  }

  async delete(repository: StudyFieldDoc, options?: IDatabaseSaveOptions): Promise<StudyFieldDoc> {
    return this.studyFieldRepo.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.studyFieldRepo.deleteMany(find, options)
  }

  async createMany(data: StudyFieldCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: StudyFieldEntity[] = data.map(({ name }) => {
      const entity: StudyFieldEntity = new StudyFieldEntity()
      entity.name = name

      return entity
    })

    for (const studyField of create) {
      try {
        await this.studyFieldRepo.create<StudyFieldEntity>(studyField, options)
      } catch {
        continue
      }
    }

    return true
  }
}
