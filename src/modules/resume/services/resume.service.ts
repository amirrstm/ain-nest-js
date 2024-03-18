import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface'

import { ResumeCreateDto } from '../dto/resume.create.dto'
import { IResumeService } from '../interfaces/resume.service.interface'
import { ResumeDoc, ResumeEntity } from '../repository/entities/resume.entity'
import { ResumeRepository } from '../repository/repositories/resume.repository'

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

@Injectable()
export class ResumeService implements IResumeService {
  constructor(private readonly resumeRepository: ResumeRepository) {}

  async findAll<T = ResumeDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.resumeRepository.findAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ResumeDoc> {
    return this.resumeRepository.findOneById<ResumeDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ResumeDoc> {
    return this.resumeRepository.findOne<ResumeDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.resumeRepository.getTotal(find, options)
  }

  async create({ user }: ResumeCreateDto, options?: IDatabaseCreateOptions): Promise<ResumeDoc> {
    const create: ResumeEntity = new ResumeEntity()
    create.user = user

    return this.resumeRepository.create<ResumeEntity>(create, options)
  }

  async updateWork(repository: ResumeDoc, work: ResumeWorkDTO[], options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    repository.work = work

    return this.resumeRepository.save(repository, options)
  }

  async updateBasic(repository: ResumeDoc, basic: ResumeBasicDTO, options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    repository.basic = basic

    return this.resumeRepository.save(repository, options)
  }

  async updateAward(
    repository: ResumeDoc,
    awards: ResumeAwardDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.awards = awards

    return this.resumeRepository.save(repository, options)
  }

  async updateCertificate(
    repository: ResumeDoc,
    certificates: ResumeCertificateDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.certificates = certificates

    return this.resumeRepository.save(repository, options)
  }

  async updateEducation(
    repository: ResumeDoc,
    education: ResumeEducationDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.education = education

    return this.resumeRepository.save(repository, options)
  }

  async updateInterest(
    repository: ResumeDoc,
    interests: ResumeInterestDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.interests = interests

    return this.resumeRepository.save(repository, options)
  }

  async updateInvention(
    repository: ResumeDoc,
    inventions: ResumeInventionDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.inventions = inventions

    return this.resumeRepository.save(repository, options)
  }

  async updateLanguage(
    repository: ResumeDoc,
    languages: ResumeLanguageDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.languages = languages

    return this.resumeRepository.save(repository, options)
  }

  async updateProfile(
    repository: ResumeDoc,
    profiles: ResumeProfileDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.profiles = profiles

    return this.resumeRepository.save(repository, options)
  }

  async updateProject(
    repository: ResumeDoc,
    projects: ResumeProjectDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.projects = projects

    return this.resumeRepository.save(repository, options)
  }

  async updatePublication(
    repository: ResumeDoc,
    publications: ResumePublicationDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.publications = publications

    return this.resumeRepository.save(repository, options)
  }

  async updateReference(
    repository: ResumeDoc,
    references: ResumeReferenceDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.references = references

    return this.resumeRepository.save(repository, options)
  }

  async updateSkill(
    repository: ResumeDoc,
    skills: ResumeSkillDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.skills = skills

    return this.resumeRepository.save(repository, options)
  }

  async updateSpeech(
    repository: ResumeDoc,
    speeches: ResumeSpeechDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.speeches = speeches

    return this.resumeRepository.save(repository, options)
  }

  async updateTeaching(
    repository: ResumeDoc,
    teaching: ResumeTeachingDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.teaching = teaching

    return this.resumeRepository.save(repository, options)
  }

  async updateVolunteer(
    repository: ResumeDoc,
    volunteer: ResumeVolunteerDTO[],
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.volunteer = volunteer

    return this.resumeRepository.save(repository, options)
  }

  async active(repository: ResumeDoc, options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    repository.isActive = true

    return this.resumeRepository.save(repository, options)
  }

  async inactive(repository: ResumeDoc, options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    repository.isActive = false

    return this.resumeRepository.save(repository, options)
  }

  async delete(repository: ResumeDoc, options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    return this.resumeRepository.delete(repository, options)
  }
}
