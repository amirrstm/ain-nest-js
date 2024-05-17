import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { IResponse } from 'src/common/response/interfaces/response.interface'
import { Response } from 'src/common/response/decorators/response.decorator'

import { CompanyService } from '../services/company.service'
import { CompanyPublicListDoc } from '../docs/company.public.doc'
import { CompanyGetSerialization } from '../serializations/company.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class CompanyPublicController {
  constructor(private readonly companyService: CompanyService) {}

  @CompanyPublicListDoc()
  @Response('data.company.list', { serialization: CompanyGetSerialization })
  @Get('/companies')
  async list(@Query() query: Record<string, any>): Promise<IResponse> {
    const data = await this.companyService.getFromApi(query.search)

    return { data }
  }
}
