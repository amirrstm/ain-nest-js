import { Document } from 'mongoose'
import { Prop, SchemaFactory } from '@nestjs/mongoose'

import { UserEntity } from 'src/modules/user/repository/entities/user.entity'
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator'
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract'

import {
  IResumeEducationField,
  IResumeProjectField,
  IResumeSkillField,
  IResumeWorkField,
  IResumeAwardField,
  IResumeBasicField,
  IResumeCertificateField,
  IResumeInterestField,
  IResumeInventionField,
  IResumeLanguageField,
  IResumeProfileField,
  IResumePublicationField,
  IResumeReferenceField,
  IResumeSpeechField,
  IResumeTeachingField,
  IResumeVolunteerField,
} from './fields'
import {
  IResumeEducation,
  IResumeProject,
  IResumeSkill,
  IResumeWork,
  IResumeAward,
  IResumeBasic,
  IResumeCertificate,
  IResumeInterest,
  IResumeInvention,
  IResumeLanguage,
  IResumeProfile,
  IResumePublication,
  IResumeReference,
  IResumeSpeech,
  IResumeTeaching,
  IResumeVolunteer,
  IResumeTemplateSettings,
} from '../../interfaces/resume.fields'

import { AwsS3Serialization } from 'src/common/aws/serializations/aws.serialization'
import { TemplateEntity } from 'src/modules/template/repository/entities/template.entity'
import { IResumeTemplateSettingsField } from './fields/template-settings'

export const ResumeDatabaseName = 'resumes'

@DatabaseEntity({ collection: ResumeDatabaseName })
export class ResumeEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    index: true,
    required: true,
    ref: UserEntity.name,
  })
  user: string

  @Prop({
    type: String,
    required: false,
  })
  title: string

  @Prop({
    index: true,
    required: true,
    ref: TemplateEntity.name,
  })
  template: string

  @Prop({
    _id: false,
    required: false,
    type: IResumeTemplateSettingsField,
  })
  templateSettings: IResumeTemplateSettings

  @Prop({
    _id: false,
    required: false,
    type: {
      path: String,
      mime: String,
      size: Number,
      baseUrl: String,
      filename: String,
      completedUrl: String,
      pathWithFilename: String,
      duration: { type: Number, required: false },
    },
  })
  file?: AwsS3Serialization

  @Prop({
    required: false,
    _id: false,
    type: {
      path: String,
      mime: String,
      size: Number,
      baseUrl: String,
      filename: String,
      completedUrl: String,
      pathWithFilename: String,
      duration: { type: Number, required: false },
    },
  })
  image?: AwsS3Serialization

  @Prop({
    _id: false,
    required: false,
    type: IResumeBasicField,
  })
  basic: IResumeBasic

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeWorkField],
  })
  work: IResumeWork[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeEducationField],
  })
  education: IResumeEducation[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeSkillField],
  })
  skills: IResumeSkill[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeProjectField],
  })
  projects: IResumeProject[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeAwardField],
  })
  awards: IResumeAward[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumePublicationField],
  })
  publications: IResumePublication[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeLanguageField],
  })
  languages: IResumeLanguage[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeCertificateField],
  })
  certificates: IResumeCertificate[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeVolunteerField],
  })
  volunteer: IResumeVolunteer[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeInterestField],
  })
  interests: IResumeInterest[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeReferenceField],
  })
  references: IResumeReference[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeInventionField],
  })
  inventions: IResumeInvention[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeProfileField],
  })
  profiles: IResumeProfile[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeSpeechField],
  })
  speeches: IResumeSpeech[]

  @Prop({
    _id: false,
    default: [],
    required: false,
    type: [IResumeTeachingField],
  })
  teaching: IResumeTeaching[]

  @Prop({
    type: Boolean,
    default: false,
    required: false,
  })
  isDefault: boolean

  @Prop({
    default: true,
    type: Boolean,
    required: false,
  })
  isActive: boolean
}

export const ResumeSchema = SchemaFactory.createForClass(ResumeEntity)

export type ResumeDoc = ResumeEntity & Document
