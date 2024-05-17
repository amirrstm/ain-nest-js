import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IResponse } from 'src/common/response/interfaces/response.interface'
import { Response } from 'src/common/response/decorators/response.decorator'

import { StudyFieldService } from '../services/study-field.service'
import { StudyFieldsPublicListDoc } from '../docs/study-field.public.doc'
import { StudyFieldGetSerialization } from '../serializations/study-field.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class StudyFieldPublicController {
  constructor(private readonly studyFieldService: StudyFieldService) {}

  @StudyFieldsPublicListDoc()
  @Response('data.studyField.list', { serialization: StudyFieldGetSerialization })
  @Get('/study-fields')
  async list(@Query() query: Record<string, any>): Promise<IResponse> {
    const data = await this.studyFieldService.getFromApi(query.search)

    return { data }
  }
}
