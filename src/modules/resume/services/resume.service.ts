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
import { HelperDateService } from 'src/common/helper/services/helper.date.service'
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.serialization'
import { IResumeDoc } from '../interfaces/resume.interface'
import { ResumeTemplateSettingsDTO } from '../dto/resume.template-settings.dto'
import { TemplateDoc } from 'src/modules/template/repository/entities/template.entity'

@Injectable()
export class ResumeService implements IResumeService {
  constructor(
    private readonly resumeRepository: ResumeRepository,
    private readonly helperDateService: HelperDateService
  ) {}

  async findAll<T = ResumeDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.resumeRepository.findAll<T>(find, options)
  }

  async findOneById<T = ResumeDoc>(_id: string, options?: IDatabaseFindOneOptions): Promise<T> {
    return this.resumeRepository.findOneById<T>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ResumeDoc> {
    return this.resumeRepository.findOne<ResumeDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.resumeRepository.getTotal(find, options)
  }

  async create(
    { user, title, template, templateSettings, lang }: ResumeCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<ResumeDoc> {
    const create: ResumeEntity = new ResumeEntity()
    create.user = user
    create.lang = lang
    create.title = title
    create.template = template
    create.templateSettings = templateSettings

    return this.resumeRepository.create<ResumeEntity>(create, options)
  }

  async createWithData(data: Record<string, any>, options?: IDatabaseCreateOptions): Promise<ResumeDoc> {
    const create: ResumeEntity = new ResumeEntity()
    create.work = data.work
    create.lang = data.lang
    create.user = data.user
    create.title = data.title
    create.basic = data.basic
    create.skills = data.skills
    create.template = data.template
    create.education = data.education
    create.languages = data.languages
    create.templateSettings = data.templateSettings

    return this.resumeRepository.create<ResumeEntity>(create, options)
  }

  async updateFile(
    repository: ResumeDoc,
    file: AwsS3Serialization,
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.file = file

    return this.resumeRepository.save(repository, options)
  }

  async updateImage(
    repository: ResumeDoc,
    image: AwsS3Serialization,
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.image = image

    return this.resumeRepository.save(repository, options)
  }

  async removeImage(repository: ResumeDoc, options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    repository.image = undefined

    return this.resumeRepository.save(repository, options)
  }

  async updateTitle(repository: ResumeDoc, title: string, options?: IDatabaseSaveOptions): Promise<ResumeDoc> {
    repository.title = title

    return this.resumeRepository.save(repository, options)
  }

  async updateTemplate(
    repository: ResumeDoc,
    template: TemplateDoc,
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.template = template._id
    repository.templateSettings = template.defaultSettings

    return this.resumeRepository.save(repository, options)
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

  async updateTemplateSettings(
    repository: ResumeDoc,
    templateSettings: ResumeTemplateSettingsDTO,
    options?: IDatabaseSaveOptions
  ): Promise<ResumeDoc> {
    repository.templateSettings = templateSettings

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

  toPersianDate(repository: IResumeDoc): ResumeDoc {
    const resume: ResumeDoc = repository.toJSON()

    const work = resume.work.map(work => {
      if (work.startDate) {
        work.startDate = this.helperDateService.formatPersian(work?.startDate as Date)
      }
      if (work.endDate) {
        work.endDate = this.helperDateService.formatPersian(work?.endDate as Date)
      }

      return work
    })

    const education = resume.education.map(education => {
      if (education.startDate) {
        education.startDate = this.helperDateService.formatPersian(education?.startDate as Date)
      }

      if (education.endDate) {
        education.endDate = this.helperDateService.formatPersian(education?.endDate as Date)
      }

      return education
    })

    const projects = resume.projects.map(project => {
      if (project.startDate) {
        project.startDate = this.helperDateService.formatPersian(project?.startDate as Date)
      }
      if (project.endDate) {
        project.endDate = this.helperDateService.formatPersian(project?.endDate as Date)
      }

      return project
    })

    const certificates = resume.certificates.map(certificate => {
      if (certificate.date) {
        certificate.date = this.helperDateService.formatPersian(certificate?.date as Date)
      }

      return certificate
    })

    const awards = resume.awards.map(award => {
      if (award.date) {
        award.date = this.helperDateService.formatPersian(award?.date as Date)
      }

      return award
    })

    const publications = resume.publications.map(publication => {
      if (publication.releaseDate) {
        publication.releaseDate = this.helperDateService.formatPersian(publication?.releaseDate as Date)
      }

      return publication
    })

    const teaching = resume.teaching.map(teaching => {
      if (teaching.date) {
        teaching.date = this.helperDateService.formatPersian(teaching?.date as Date)
      }

      return teaching
    })

    const volunteer = resume.volunteer.map(volunteer => {
      if (volunteer.startDate) {
        volunteer.startDate = this.helperDateService.formatPersian(volunteer?.startDate as Date)
      }

      if (volunteer.endDate) {
        volunteer.endDate = this.helperDateService.formatPersian(volunteer?.endDate as Date)
      }

      return volunteer
    })

    const speeches = resume.speeches.map(speech => {
      if (speech.date) {
        speech.date = this.helperDateService.formatPersian(speech?.date as Date)
      }

      return speech
    })

    const inventions = resume.inventions.map(invention => {
      if (invention.date) {
        invention.date = this.helperDateService.formatPersian(invention?.date as Date)
      }

      return invention
    })

    const basic = { ...resume.basic }
    if (basic.birthDate) {
      basic.birthDate = this.helperDateService.formatPersian(resume.basic?.birthDate as Date, { day: 'numeric' })
    }

    const skills = resume.skills.map(skill => {
      skill.level = skill.level * 20
      return skill
    })

    const languages = resume.languages.map(language => {
      language.level = language.level * 20
      return language
    })

    const templateSettings = { ...resume.templateSettings }
    if (templateSettings?.blockMargins) {
      templateSettings.blockMargins = `${Number(templateSettings.blockMargins) * 1.5}rem`
    }

    return {
      ...resume,
      work,
      education,
      projects,
      basic,
      skills,
      languages,
      certificates,
      volunteer,
      awards,
      speeches,
      publications,
      teaching,
      inventions,
      templateSettings,
    } as ResumeDoc
  }

  async getFileUploadPath(user: string): Promise<string> {
    return `/resume/pdf/${user}`
  }

  async getImageUploadPath(user: string): Promise<string> {
    return `/resume/avatar/${user}`
  }
}
