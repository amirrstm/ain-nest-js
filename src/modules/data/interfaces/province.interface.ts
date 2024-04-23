import { ProvinceDoc, ProvinceEntity } from '../repository/entities/province.entity'

export interface IProvinceEntity extends Omit<ProvinceEntity, 'cities'> {
  cities: IProvinceCity[]
}

export interface ICategoryDoc extends Omit<ProvinceDoc, 'cities'> {
  cities: IProvinceCity[]
}

export interface IProvinceCity {
  latitude: number
  longitude: number
  name: Record<string, string>
}
