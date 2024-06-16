import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

import { ENUM_TEMPLATE_TYPE } from '../../constants/template.enum.constant'
import { ITemplateDefaultSettings } from '../../interfaces/template.interface'

export const TemplateDatabaseName = 'templates'

@DatabaseEntity({ collection: TemplateDatabaseName })
export class TemplateEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    index: true,
    unique: true,
    trim: true,
    type: String,
  })
  name: string

  @Prop({
    trim: true,
    type: String,
    required: true,
  })
  path: string

  @Prop({
    trim: true,
    type: String,
    required: true,
  })
  image: string

  @Prop({
    trim: true,
    type: String,
    required: true,
  })
  lang: string

  @Prop({
    required: false,
    trim: true,
    type: String,
  })
  description?: string

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean

  @Prop({
    index: true,
    type: String,
    required: true,
    enum: ENUM_TEMPLATE_TYPE,
  })
  type: ENUM_TEMPLATE_TYPE

  @Prop({
    _id: false,
    required: false,
    type: {
      nameColor: {
        type: String,
        required: false,
      },
      jobTitleColor: {
        type: String,
        required: false,
      },
      sectionTitleColor: {
        type: String,
        required: false,
      },
      placesColor: {
        type: String,
        required: false,
      },
      defaultFont: {
        type: String,
        required: false,
      },
      roundedProfilePicture: {
        type: Boolean,
        required: false,
      },
      skillBarColor: {
        type: String,
        required: false,
      },
      hideInformationIcon: {
        type: Boolean,
        required: false,
      },
      blockMargins: {
        type: String,
        required: false,
      },
    },
  })
  defaultSettings: ITemplateDefaultSettings
}

export const TemplateSchema = SchemaFactory.createForClass(TemplateEntity)

export type TemplateDoc = TemplateEntity & Document
