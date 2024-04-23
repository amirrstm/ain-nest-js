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

import { ProvinceCreateDto } from '../dto/province.create.dto'
import { IProvinceService } from '../interfaces/province.service.interface'
import { ProvinceRepository } from '../repository/repositories/province.repository'
import { ProvinceDoc, ProvinceEntity } from '../repository/entities/province.entity'

@Injectable()
export class ProvinceService implements IProvinceService {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async findAll<T = ProvinceDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.provinceRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = ProvinceDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.provinceRepository.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ProvinceDoc> {
    return this.provinceRepository.findOneById<ProvinceDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ProvinceDoc> {
    return this.provinceRepository.findOne<ProvinceDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.provinceRepository.getTotal(find, options)
  }

  async create(
    { name, cities, latitude, longitude }: ProvinceCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<ProvinceDoc> {
    const create: ProvinceEntity = new ProvinceEntity()
    create.name = name
    create.cities = cities
    create.latitude = latitude
    create.longitude = longitude

    return this.provinceRepository.create<ProvinceEntity>(create, options)
  }

  async delete(repository: ProvinceDoc, options?: IDatabaseSaveOptions): Promise<ProvinceDoc> {
    return this.provinceRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.provinceRepository.deleteMany(find, options)
  }

  async createMany(data: ProvinceCreateDto[], options?: IDatabaseCreateManyOptions): Promise<boolean> {
    const create: ProvinceEntity[] = data.map(({ name, cities, latitude, longitude }) => {
      const entity: ProvinceEntity = new ProvinceEntity()
      entity.name = name
      entity.cities = cities
      entity.latitude = latitude
      entity.longitude = longitude

      return entity
    })
    return this.provinceRepository.createMany<ProvinceEntity>(create, options)
  }
}
