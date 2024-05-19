import { applyDecorators } from '@nestjs/common'

import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant'
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization'
import {
  Doc,
  DocAuth,
  DocGuard,
  DocRequest,
  DocRequestFile,
  DocResponse,
  DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator'

import { ResumeGetSerialization } from '../serializations/resume.get.serialization'

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
import { FileSingleDto } from 'src/common/file/dtos/file.single.dto'
import { ResumeDocParamsId } from '../constants/resume.doc.constant'
import { ResumeTemplateSettingsDTO } from '../dto/resume.template-settings.dto'

export function ResumeUserListDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Get All Of Resumes',
    }),
    DocAuth({ jwtAccessToken: true }),
    DocResponsePaging<ResumeGetSerialization>('resume.get', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserCreateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Create new Resume',
    }),
    DocRequest({
      body: ResumeCreateDto,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResponseIdSerialization>('resume.create', { serialization: ResponseIdSerialization })
  )
}

export function ResumeUserGetDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get detail a resume',
    }),
    DocRequest({ params: ResumeDocParamsId }),
    DocResponse<ResponseIdSerialization>('resume.get', {
      serialization: ResumeGetSerialization,
    })
  )
}

export function ResumeUserImageDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Image',
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocRequestFile({ body: FileSingleDto }),
    DocResponse('resume.update')
  )
}

export function ResumeUserBasicDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Basic',
    }),
    DocRequest({
      body: ResumeBasicDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserWorkDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Work',
    }),
    DocRequest({
      body: ResumeWorkDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserEducationDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Education',
    }),
    DocRequest({
      body: ResumeEducationDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserProjectDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Project',
    }),
    DocRequest({
      body: ResumeProjectDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserPublicationDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Publication',
    }),
    DocRequest({
      body: ResumePublicationDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserSkillDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Skill',
    }),
    DocRequest({
      body: ResumeSkillDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserLanguageDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Language',
    }),
    DocRequest({
      body: ResumeLanguageDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserInterestDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Interest',
    }),
    DocRequest({
      body: ResumeInterestDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserReferenceDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Reference',
    }),
    DocRequest({
      body: ResumeReferenceDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserCertificateDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Certificate',
    }),
    DocRequest({
      body: ResumeCertificateDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserAwardDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Award',
    }),
    DocRequest({
      body: ResumeAwardDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserTeachingDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Teaching',
    }),
    DocRequest({
      body: ResumeTeachingDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserSpeechDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Speech',
    }),
    DocRequest({
      body: ResumeSpeechDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserVolunteerDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Volunteer',
    }),
    DocRequest({
      body: ResumeVolunteerDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserInventionDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Invention',
    }),
    DocRequest({
      body: ResumeInventionDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserProfileDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Profile',
    }),
    DocRequest({
      body: ResumeProfileDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserTemplateSettingsDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'Update Resume Template Settings',
    }),
    DocRequest({
      body: ResumeTemplateSettingsDTO,
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocGuard({ role: true }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse<ResumeGetSerialization>('resume.update', { serialization: ResumeGetSerialization })
  )
}

export function ResumeUserDeleteDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'delete a resume' }),
    DocRequest({ params: ResumeDocParamsId }),
    DocAuth({ jwtAccessToken: true }),
    DocResponse('resume.delete')
  )
}
