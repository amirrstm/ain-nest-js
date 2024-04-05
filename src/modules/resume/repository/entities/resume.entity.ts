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
} from '../../interfaces/resume.fields'
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.serialization'

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
    required: false,
    type: IResumeBasicField,
  })
  basic: IResumeBasic

  @Prop({
    default: [],
    required: false,
    type: [IResumeWorkField],
  })
  work: IResumeWork[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeEducationField],
  })
  education: IResumeEducation[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeSkillField],
  })
  skills: IResumeSkill[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeProjectField],
  })
  projects: IResumeProject[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeAwardField],
  })
  awards: IResumeAward[]

  @Prop({
    default: [],
    required: false,
    type: [IResumePublicationField],
  })
  publications: IResumePublication[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeLanguageField],
  })
  languages: IResumeLanguage[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeCertificateField],
  })
  certificates: IResumeCertificate[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeVolunteerField],
  })
  volunteer: IResumeVolunteer[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeInterestField],
  })
  interests: IResumeInterest[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeReferenceField],
  })
  references: IResumeReference[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeInventionField],
  })
  inventions: IResumeInvention[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeProfileField],
  })
  profiles: IResumeProfile[]

  @Prop({
    default: [],
    required: false,
    type: [IResumeSpeechField],
  })
  speeches: IResumeSpeech[]

  @Prop({
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
