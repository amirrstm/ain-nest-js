import { ToneEntity } from '../repository/entities/tone.entity'

export interface IToneEntity extends Omit<ToneEntity, 'name'> {
  name: string
}
