import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'

import { ResumeDoc } from '../repository/entities/resume.entity'
import { ResumeCreateDto } from '../dto/resume.create.dto'

import {
  ResumeWorkDTO,
  ResumeBasicDTO,
  ResumeAwardDTO,
  ResumeCertificateDTO,
  ResumeEducationDTO,
  ResumeInterestDTO,
  ResumeInventionDTO,
  ResumeLanguageDTO,
  ResumeProfileDTO,
  ResumeProjectDTO,
  ResumePublicationDTO,
  ResumeReferenceDTO,
  ResumeSkillDTO,
  ResumeSpeechDTO,
  ResumeTeachingDTO,
  ResumeVolunteerDTO,
} from '../dto'

export interface IResumeService {
  findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ResumeDoc>
  findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>
  findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ResumeDoc>
  getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>

  updateWork(repository: ResumeDoc, work: ResumeWorkDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updateBasic(repository: ResumeDoc, basic: ResumeBasicDTO, options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updateAward(repository: ResumeDoc, award: ResumeAwardDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updateCertificate(
    repository: ResumeDoc,
    certificate: ResumeCertificateDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateEducation(
    repository: ResumeDoc,
    education: ResumeEducationDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateInterest(
    repository: ResumeDoc,
    interest: ResumeInterestDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateInvention(
    repository: ResumeDoc,
    invention: ResumeInventionDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateLanguage(
    repository: ResumeDoc,
    language: ResumeLanguageDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateProfile(repository: ResumeDoc, profile: ResumeProfileDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updateProject(repository: ResumeDoc, project: ResumeProjectDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updatePublication(
    repository: ResumeDoc,
    publication: ResumePublicationDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateReference(
    repository: ResumeDoc,
    reference: ResumeReferenceDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateSkill(repository: ResumeDoc, skill: ResumeSkillDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updateSpeech(repository: ResumeDoc, speech: ResumeSpeechDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc>
  updateTeaching(
    repository: ResumeDoc,
    teaching: ResumeTeachingDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>
  updateVolunteer(
    repository: ResumeDoc,
    volunteer: ResumeVolunteerDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc>

  create(data: ResumeCreateDto, options?: IDatabaseCreateOptions): Promise<ResumeDoc>
  delete(repository: ResumeDoc, options?: IDatabaseSaveOptions): Promise<ResumeDoc>
}
