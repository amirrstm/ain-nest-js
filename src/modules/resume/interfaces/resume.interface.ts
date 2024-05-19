import { TemplateDoc, TemplateEntity } from 'src/modules/template/repository/entities/template.entity'
import { ResumeDoc, ResumeEntity } from '../repository/entities/resume.entity'

export interface IResumeEntity extends Omit<ResumeEntity, 'template'> {
  template: TemplateEntity
}

export interface IResumeDoc extends Omit<ResumeDoc, 'template'> {
  template: TemplateDoc
}

export * from './resume.fields'
