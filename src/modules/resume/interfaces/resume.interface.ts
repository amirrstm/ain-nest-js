import { ResumeDoc, ResumeEntity } from '../repository/entities/resume.entity'

export interface IResumeEntity extends ResumeEntity {}

export interface IResumeDoc extends ResumeDoc {}

export * from './resume.fields'
