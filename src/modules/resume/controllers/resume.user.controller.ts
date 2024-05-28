import { sprintf } from 'sprintf-js'
import { Body, Controller, Delete, Get, NotFoundException, Post, Put, UploadedFile } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PdfService } from 'src/common/pdf/services/pdf.service'
import { AwsService } from 'src/common/aws/services/aws.service'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { Response, ResponsePaging } from 'src/common/response/decorators/response.decorator'
import { IResponse, IResponsePaging } from 'src/common/response/interfaces/response.interface'
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { TemplateService } from 'src/modules/template/services/template.service'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'

import { ResumeService } from '../services/resume.service'
import { ResumeRequestDto } from '../dto/resume.request.dto'
import { ResumeDoc, ResumeEntity } from '../repository/entities/resume.entity'
import { GetResume } from '../decorators/resume.admin.decorator'
import { ResumeUserGetGuard } from '../decorators/resume.user.decorator'
import { ResumeGetSerialization } from '../serializations/resume.get.serialization'

import {
  ResumeUserCreateDoc,
  ResumeUserWorkDoc,
  ResumeUserAwardDoc,
  ResumeUserBasicDoc,
  ResumeUserCertificateDoc,
  ResumeUserEducationDoc,
  ResumeUserInterestDoc,
  ResumeUserInventionDoc,
  ResumeUserLanguageDoc,
  ResumeUserProfileDoc,
  ResumeUserProjectDoc,
  ResumeUserPublicationDoc,
  ResumeUserReferenceDoc,
  ResumeUserSkillDoc,
  ResumeUserSpeechDoc,
  ResumeUserTeachingDoc,
  ResumeUserVolunteerDoc,
  ResumeUserImageDoc,
  ResumeUserGetDoc,
  ResumeUserListDoc,
  ResumeUserDeleteDoc,
  ResumeUserTemplateSettingsDoc,
} from '../docs/resume.user.doc'
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

import { IFile } from 'src/common/file/interfaces/file.interface'
import { FileTypePipe } from 'src/common/file/pipes/file.type.pipe'
import { FileRequiredPipe } from 'src/common/file/pipes/file.required.pipe'
import { FileUploadSingle } from 'src/common/file/decorators/file.decorator'
import { ENUM_FILE_MIME } from 'src/common/file/constants/file.enum.constant'
import { IAwsS3RandomFilename } from 'src/common/aws/interfaces/aws.interface'
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.serialization'
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator'
import {
  RESUME_DEFAULT_AVAILABLE_ORDER_BY,
  RESUME_DEFAULT_AVAILABLE_SEARCH,
  RESUME_DEFAULT_ORDER_BY,
  RESUME_DEFAULT_ORDER_DIRECTION,
  RESUME_DEFAULT_PER_PAGE,
} from '../constants/resume.list.constant'
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto'
import { ResumeListSerialization } from '../serializations/resume.list.serialization'
import { PaginationService } from 'src/common/pagination/services/pagination.service'
import { OpenAIService } from 'src/common/open-ai/services/open-ai.service'
import { ENUM_AI_ROLE } from 'src/common/open-ai/constants/open-ai.enum.constant'
import {
  RESUME_BIO_GENERATE_PROMPT,
  RESUME_GENERATE_PROMPT,
  RESUME_VOICE_BIO_PROMPT,
} from '../constants/resume.ai.constant'
import { ResumeCreateDto } from '../dto/resume.create.dto'
import { ENUM_TEMPLATE_STATUS_CODE_ERROR } from 'src/modules/template/constants/template.status-code.constant'
import { IResumeDoc } from '../interfaces/resume.interface'
import { ResumeTemplateSettingsDTO } from '../dto/resume.template-settings.dto'

@ApiTags('Modules.User.Resume')
@Controller({ version: '1', path: '/resume' })
export class ResumeUserController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly awsS3Service: AwsService,
    private readonly aiService: OpenAIService,
    private readonly resumeService: ResumeService,
    private readonly templateService: TemplateService,
    private readonly paginationService: PaginationService
  ) {}

  @ResumeUserListDoc()
  @ResponsePaging('resume.list', { serialization: ResumeListSerialization })
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Get('/list')
  async list(
    @PaginationQuery(
      RESUME_DEFAULT_PER_PAGE,
      RESUME_DEFAULT_ORDER_BY,
      RESUME_DEFAULT_ORDER_DIRECTION,
      RESUME_DEFAULT_AVAILABLE_SEARCH,
      RESUME_DEFAULT_AVAILABLE_ORDER_BY
    )
    { _search, _limit, _offset, _order }: PaginationListDto,
    @GetUser() user: UserDoc
  ): Promise<IResponsePaging> {
    const find: Record<string, any> = { ..._search, user: user._id }

    const resumes: ResumeEntity[] = await this.resumeService.findAll<ResumeEntity>(find, {
      paging: {
        limit: _limit,
        offset: _offset,
      },
      order: _order,
      plainObject: true,
      select: {
        file: 1,
        title: 1,
        isActive: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    })

    const total: number = await this.resumeService.getTotal(find)
    const totalPage: number = this.paginationService.totalPage(total, _limit)

    return { _pagination: { total, totalPage }, data: resumes }
  }

  @ResumeUserCreateDoc()
  @Response('resume.create')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Post('/')
  async create(
    @GetUser() user: UserDoc,
    @Body() { template, title }: Omit<ResumeCreateDto, 'user'>
  ): Promise<IResponse> {
    const templateEntity = await this.templateService.findOneById(template)

    if (!templateEntity) {
      throw new NotFoundException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_NOT_FOUND_ERROR,
        message: 'template.error.notFound',
      })
    }

    const create = await this.resumeService.create({
      title,
      template,
      user: user._id,
      templateSettings: templateEntity.defaultSettings,
    })

    return { data: create._id }
  }

  @ResumeUserGetDoc()
  @Response('resume.get')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @ResumeUserGetGuard()
  @Get('/:resume')
  async getOne(@GetUser() user: UserDoc, @GetResume() resume: ResumeDoc): Promise<IResponse> {
    const foundResume = await this.resumeService.findOne({ user: user._id, _id: resume._id })

    return { data: foundResume }
  }

  @ResumeUserGetDoc()
  @Response('resume.get')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @ResumeUserGetGuard()
  @Get('/:resume/settings')
  async getSettings(@GetUser() user: UserDoc, @GetResume() resume: ResumeDoc): Promise<IResponse> {
    const foundResume = await this.resumeService.findOne({ user: user._id, _id: resume._id })

    return { data: foundResume.templateSettings }
  }

  @Response('resume.update')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @ResumeUserGetGuard()
  @Put('/:resume/settings')
  async updateSettings(@GetResume() resume: ResumeDoc, @Body() body: ResumeTemplateSettingsDTO): Promise<IResponse> {
    const foundResume = await this.resumeService.updateTemplateSettings(resume, body)

    return { data: foundResume.templateSettings }
  }

  @Response('resume.update')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @ResumeUserGetGuard()
  @Put('/:resume/template')
  async updateTemplate(@GetResume() resume: ResumeDoc, @Body() body: { template: string }): Promise<IResponse> {
    const templateEntity = await this.templateService.findOneById(body.template)

    if (!templateEntity) {
      throw new NotFoundException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_NOT_FOUND_ERROR,
        message: 'template.error.notFound',
      })
    }

    const foundResume = await this.resumeService.updateTemplate(resume, templateEntity)

    return { data: foundResume._id }
  }

  @Response('resume.update')
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Post('/:resume/update')
  async update(@GetResume<IResumeDoc>() resume: IResumeDoc): Promise<IResponse> {
    const templateEntity = await this.templateService.findOneById(resume.template._id)

    if (!templateEntity) {
      throw new NotFoundException({
        statusCode: ENUM_TEMPLATE_STATUS_CODE_ERROR.TEMPLATE_NOT_FOUND_ERROR,
        message: 'template.error.notFound',
      })
    }

    const resumeData = this.resumeService.toPersianDate(resume)
    const pdfFile = await this.pdfService.generatePdf(templateEntity.path, resumeData)

    // const pathPrefix: string = await this.resumeService.getFileUploadPath(resume._id)
    // const randomFilename: IAwsS3RandomFilename = await this.awsS3Service.createRandomFilename(pathPrefix)

    // const file = { buffer: pdfFile, size: pdfFile.byteLength, originalname: 'output.pdf' }
    // const aws = await this.awsS3Service.putItemInBucket(file, randomFilename)
    // const updated = await this.resumeService.updateFile(resume as unknown as ResumeDoc, aws)

    // return { data: { _id: updated._id, url: aws.completedUrl } }

    return { data: { url: 'Updated' } }
  }

  @Response('resume.update')
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Put('/:resume/title')
  async updateTitle(@GetResume() resume: ResumeDoc, @Body() body: { title: string }): Promise<IResponse> {
    const update = await this.resumeService.updateTitle(resume, body.title)

    return { data: update._id }
  }

  @ResumeUserImageDoc()
  @Response('resume.update')
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @FileUploadSingle()
  @Put('/:resume/upload-image')
  async upload(
    @GetResume() resume: ResumeDoc,
    @UploadedFile(
      new FileRequiredPipe(),
      new FileTypePipe([ENUM_FILE_MIME.PNG, ENUM_FILE_MIME.JPG, ENUM_FILE_MIME.JPEG])
    )
    file: IFile
  ): Promise<IResponse> {
    const pathPrefix: string = await this.resumeService.getImageUploadPath(resume._id)
    const randomFilename: IAwsS3RandomFilename = await this.awsS3Service.createRandomFilename(pathPrefix)

    const aws: AwsS3Serialization = await this.awsS3Service.putItemInBucket(file, randomFilename)
    const update = await this.resumeService.updateImage(resume, aws)

    return { data: update.image }
  }

  @ResumeUserImageDoc()
  @Response('resume.update')
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Delete('/:resume/upload-image')
  async deleteImage(@GetResume() resume: ResumeDoc): Promise<IResponse> {
    const update = await this.resumeService.removeImage(resume)

    return { data: update.image }
  }

  @ResumeUserWorkDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/work')
  async work(@GetResume() resume: ResumeDoc, @Body() body: { works: ResumeWorkDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateWork(resume, body.works)
    return { data: update.toJSON() }
  }

  @ResumeUserBasicDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/basic')
  async basic(@GetResume() resume: ResumeDoc, @Body() body: ResumeBasicDTO): Promise<IResponse> {
    const update = await this.resumeService.updateBasic(resume, body)
    return { data: update.toJSON() }
  }

  @ResumeUserAwardDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/award')
  async award(@GetResume() resume: ResumeDoc, @Body() body: { awards: ResumeAwardDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateAward(resume, body.awards)
    return { data: update.toJSON() }
  }

  @ResumeUserCertificateDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/certificate')
  async certificate(
    @GetResume() resume: ResumeDoc,
    @Body() body: { certificates: ResumeCertificateDTO[] }
  ): Promise<IResponse> {
    const update = await this.resumeService.updateCertificate(resume, body.certificates)
    return { data: update.toJSON() }
  }

  @ResumeUserEducationDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/education')
  async education(
    @GetResume() resume: ResumeDoc,
    @Body() body: { educations: ResumeEducationDTO[] }
  ): Promise<IResponse> {
    const update = await this.resumeService.updateEducation(resume, body.educations)
    return { data: update.toJSON() }
  }

  @ResumeUserInterestDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/interest')
  async interest(@GetResume() resume: ResumeDoc, @Body() body: { interests: ResumeInterestDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateInterest(resume, body.interests)
    return { data: update.toJSON() }
  }

  @ResumeUserInventionDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/invention')
  async invention(
    @GetResume() resume: ResumeDoc,
    @Body() body: { inventions: ResumeInventionDTO[] }
  ): Promise<IResponse> {
    const update = await this.resumeService.updateInvention(resume, body.inventions)
    return { data: update.toJSON() }
  }

  @ResumeUserLanguageDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/language')
  async language(@GetResume() resume: ResumeDoc, @Body() body: { languages: ResumeLanguageDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateLanguage(resume, body.languages)
    return { data: update.toJSON() }
  }

  @ResumeUserProfileDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/profile')
  async profile(@GetResume() resume: ResumeDoc, @Body() body: { profiles: ResumeProfileDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateProfile(resume, body.profiles)
    return { data: update.toJSON() }
  }

  @ResumeUserProjectDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/project')
  async project(@GetResume() resume: ResumeDoc, @Body() body: { projects: ResumeProjectDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateProject(resume, body.projects)
    return { data: update.toJSON() }
  }

  @ResumeUserPublicationDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/publication')
  async publication(
    @GetResume() resume: ResumeDoc,
    @Body() body: { publications: ResumePublicationDTO[] }
  ): Promise<IResponse> {
    const update = await this.resumeService.updatePublication(resume, body.publications)
    return { data: update.toJSON() }
  }

  @ResumeUserReferenceDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/reference')
  async reference(
    @GetResume() resume: ResumeDoc,
    @Body() body: { references: ResumeReferenceDTO[] }
  ): Promise<IResponse> {
    const update = await this.resumeService.updateReference(resume, body.references)
    return { data: update.toJSON() }
  }

  @ResumeUserSkillDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/skill')
  async skill(@GetResume() resume: ResumeDoc, @Body() body: { skills: ResumeSkillDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateSkill(resume, body.skills)
    return { data: update.toJSON() }
  }

  @ResumeUserSpeechDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/speech')
  async speech(@GetResume() resume: ResumeDoc, @Body() body: { speeches: ResumeSpeechDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateSpeech(resume, body.speeches)
    return { data: update.toJSON() }
  }

  @ResumeUserTeachingDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/teaching')
  async teaching(@GetResume() resume: ResumeDoc, @Body() body: { teachings: ResumeTeachingDTO[] }): Promise<IResponse> {
    const update = await this.resumeService.updateTeaching(resume, body.teachings)
    return { data: update.toJSON() }
  }

  @ResumeUserVolunteerDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/volunteer')
  async volunteer(
    @GetResume() resume: ResumeDoc,
    @Body() body: { volunteers: ResumeVolunteerDTO[] }
  ): Promise<IResponse> {
    const update = await this.resumeService.updateVolunteer(resume, body.volunteers)
    return { data: update.toJSON() }
  }

  @ResumeUserTemplateSettingsDoc()
  @Response('resume.update', {
    serialization: ResumeGetSerialization,
  })
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Put('/:resume/template-settings')
  async templateSettings(@GetResume() resume: ResumeDoc, @Body() body: ResumeTemplateSettingsDTO): Promise<IResponse> {
    const update = await this.resumeService.updateTemplateSettings(resume, body)
    return { data: update.toJSON() }
  }

  @ResumeUserDeleteDoc()
  @Response('category.delete')
  @ResumeUserGetGuard()
  @AuthJwtUserAccessProtected()
  @RequestParamGuard(ResumeRequestDto)
  @Delete('/:resume')
  async delete(@GetResume() resume: ResumeDoc): Promise<void> {
    if (resume.file) {
      await this.awsS3Service.deleteFolder(resume.file.path)
    }

    if (resume.image) {
      await this.awsS3Service.deleteFolder(resume.image.path)
    }

    await this.resumeService.delete(resume)

    return
  }

  @Response('resume.update')
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @FileUploadSingle()
  @Put('/:resume/bio-voice')
  async uploadBioVoice(
    @GetResume() resume: ResumeDoc,
    @UploadedFile(
      new FileRequiredPipe(),
      new FileTypePipe([ENUM_FILE_MIME.WAV, ENUM_FILE_MIME.MP3, ENUM_FILE_MIME.WEBM])
    )
    file: IFile
  ): Promise<IResponse> {
    const systemPrompt = sprintf(RESUME_VOICE_BIO_PROMPT, { role: resume.basic.label })

    const voiceContent = await this.aiService.transcribeAudio(file.buffer)
    const bio = await this.aiService.getMessageFromPrompt([
      {
        role: ENUM_AI_ROLE.SYSTEM,
        content: systemPrompt,
      },
      {
        role: ENUM_AI_ROLE.USER,
        content: voiceContent,
      },
    ])

    return { data: { text: bio.choices[0].message.content } }
  }

  @Response('resume.update')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @FileUploadSingle()
  @Post('/voice')
  async createResumeFromVoice(
    @GetUser() user: UserDoc,
    @UploadedFile(
      new FileRequiredPipe(),
      new FileTypePipe([ENUM_FILE_MIME.WAV, ENUM_FILE_MIME.MP3, ENUM_FILE_MIME.WEBM])
    )
    file: IFile
  ): Promise<IResponse> {
    const systemPrompt = RESUME_GENERATE_PROMPT

    const voiceContent = await this.aiService.transcribeAudio(file.buffer)
    const bio = await this.aiService.getMessageFromGpt4([
      {
        role: ENUM_AI_ROLE.SYSTEM,
        content: systemPrompt,
      },
      {
        role: ENUM_AI_ROLE.USER,
        content: voiceContent,
      },
    ])
    const aiData = JSON.parse(bio.choices[0].message.content)
    const create = await this.resumeService.createWithData({
      user: user._id,
      education: aiData.educations,
      work: aiData.work_experiences,
      title: 'ساخته شده توسط صدا',
      basic: {
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        label: aiData.job_title,
        summary: aiData.about_me,
      },
      skills: (aiData.skills || []).map((skill: string) => ({ name: skill, hasLevel: true, level: 5 })),
    })

    return { data: create._id }
  }

  @Response('resume.update')
  @ResumeUserGetGuard()
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Get('/:resume/bio-ai')
  async getBioFromAI(@GetResume() resume: ResumeDoc): Promise<IResponse> {
    const systemPrompt = sprintf(RESUME_BIO_GENERATE_PROMPT, { role: resume.basic.label })

    const bio = await this.aiService.getMessageFromPrompt([
      {
        role: ENUM_AI_ROLE.SYSTEM,
        content: systemPrompt,
      },
    ])

    return { data: { text: bio.choices[0].message.content } }
  }
}
