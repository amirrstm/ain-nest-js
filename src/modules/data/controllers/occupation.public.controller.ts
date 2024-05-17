import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IResponse } from 'src/common/response/interfaces/response.interface'
import { Response } from 'src/common/response/decorators/response.decorator'

import { OccupationService } from '../services/occupation.service'
import { OccupationPublicListDoc } from '../docs/occupation.public.doc'
import { OccupationGetSerialization } from '../serializations/occupation.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class OccupationPublicController {
  constructor(private readonly occupationService: OccupationService) {}

  @OccupationPublicListDoc()
  @Response('data.occupation.list', { serialization: OccupationGetSerialization })
  @Get('/occupations')
  async list(@Query() query: Record<string, any>): Promise<IResponse> {
    const data = await this.occupationService.getFromApi(query.search)

    return { data }
  }
}
