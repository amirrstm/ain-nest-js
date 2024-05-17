import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IResponse } from 'src/common/response/interfaces/response.interface'
import { Response } from 'src/common/response/decorators/response.decorator'

import { UniversityService } from '../services/university.service'
import { UniversityPublicListDoc } from '../docs/university.public.doc'
import { UniversityGetSerialization } from '../serializations/university.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class UniversityPublicController {
  constructor(private readonly universityService: UniversityService) {}

  @UniversityPublicListDoc()
  @Response('data.university.list', { serialization: UniversityGetSerialization })
  @Get('/universities')
  async list(@Query() query: Record<string, any>): Promise<IResponse> {
    const data = await this.universityService.getFromApi(query.search)

    return { data }
  }
}
