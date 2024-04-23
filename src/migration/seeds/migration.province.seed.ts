import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

import { ProvinceService } from 'src/modules/data/services/province.service'

import Cities from '../../../data/json/cities.json'
import Provinces from '../../../data/json/provinces.json'

@Injectable()
export class MigrationProvinceSeed {
  constructor(private readonly provinceService: ProvinceService) {}

  @Command({
    command: 'seed:province',
    describe: 'seed provinces',
  })
  async seeds(): Promise<void> {
    const provinces = Provinces.map(province => ({
      name: {
        fa: province.title,
        en: province.slug,
      },
      latitude: province.latitude,
      longitude: province.longitude,
      cities: Cities.filter(city => city.province_id === province.id).map(city => ({
        name: {
          fa: city.title,
          en: city.slug,
        },
        latitude: city.latitude,
        longitude: city.longitude,
      })),
    }))

    try {
      await this.provinceService.createMany(provinces)
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }

  @Command({
    command: 'remove:province',
    describe: 'remove provinces',
  })
  async remove(): Promise<void> {
    try {
      await this.provinceService.deleteMany({})
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }
}
