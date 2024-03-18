import { Body, Controller, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'

import { ResumeService } from '../services/resume.service'
import { ResumeRequestDto } from '../dto/resume.request.dto'
import { ResumeDoc } from '../repository/entities/resume.entity'
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

@ApiTags('Modules.User.Resume')
@Controller({ version: '1', path: '/resume' })
export class ResumeUserController {
  constructor(private readonly requestService: ResumeService) {}

  @ResumeUserCreateDoc()
  @Response('resume.create')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Post('/')
  async message(@GetUser() user: UserDoc): Promise<IResponse> {
    const create = await this.requestService.create({ user: user._id })
    return { data: create._id }
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
    const update = await this.requestService.updateWork(resume, body.works)
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
    const update = await this.requestService.updateBasic(resume, body)
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
    const update = await this.requestService.updateAward(resume, body.awards)
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
    const update = await this.requestService.updateCertificate(resume, body.certificates)
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
    const update = await this.requestService.updateEducation(resume, body.educations)
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
    const update = await this.requestService.updateInterest(resume, body.interests)
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
    const update = await this.requestService.updateInvention(resume, body.inventions)
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
    const update = await this.requestService.updateLanguage(resume, body.languages)
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
    const update = await this.requestService.updateProfile(resume, body.profiles)
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
    const update = await this.requestService.updateProject(resume, body.projects)
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
    const update = await this.requestService.updatePublication(resume, body.publications)
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
    const update = await this.requestService.updateReference(resume, body.references)
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
    const update = await this.requestService.updateSkill(resume, body.skills)
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
    const update = await this.requestService.updateSpeech(resume, body.speeches)
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
    const update = await this.requestService.updateTeaching(resume, body.teachings)
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
    const update = await this.requestService.updateVolunteer(resume, body.volunteers)
    return { data: update.toJSON() }
  }
}
