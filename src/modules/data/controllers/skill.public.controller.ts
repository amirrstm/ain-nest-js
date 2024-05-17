import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IResponse } from 'src/common/response/interfaces/response.interface'
import { Response } from 'src/common/response/decorators/response.decorator'

import { SkillService } from '../services/skill.service'
import { SkillsPublicListDoc } from '../docs/skill.public.doc'
import { SkillGetSerialization } from '../serializations/skill.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class SkillPublicController {
  constructor(private readonly skillService: SkillService) {}

  @SkillsPublicListDoc()
  @Response('data.skill.list', { serialization: SkillGetSerialization })
  @Get('/skills')
  async list(@Query() query: Record<string, any>): Promise<IResponse> {
    const data = await this.skillService.getFromApi(query.search)

    return { data }
  }
}
