import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'
import { IProvinceCity } from '../../interfaces/province.interface'

export const ProvinceDatabaseName = 'provinces'

@DatabaseEntity({ collection: ProvinceDatabaseName })
export class ProvinceEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({ type: Map, of: String, required: true })
  name: Record<string, string>

  @Prop({
    required: true,
    default: [],
    _id: false,
    type: [
      {
        name: {
          type: Map,
          of: String,
          required: true,
        },
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    ],
  })
  cities: IProvinceCity[]

  @Prop({ required: true, type: Number })
  latitude: number

  @Prop({ required: true, type: Number })
  longitude: number
}

export const ProvinceSchema = SchemaFactory.createForClass(ProvinceEntity)

export type ProvinceDoc = ProvinceEntity & Document
