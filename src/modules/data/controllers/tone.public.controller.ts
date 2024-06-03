import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'

import { ToneService } from '../services/tone.service'
import { IToneEntity } from '../interfaces/tone.interface'
import { TonePublicListDoc } from '../docs/tone.public.doc'
import { ToneGetSerialization } from '../serializations/tone.get.serialization'

@ApiTags('Modules.Public.Data')
@Controller({ version: '1', path: '/data' })
export class TonePublicController {
  constructor(private readonly toneService: ToneService) {}

  @TonePublicListDoc()
  @Response('data.tone.list', { serialization: ToneGetSerialization })
  @Get('/tones')
  async list(@RequestCustomLang() customLang: string): Promise<IResponse> {
    const defaultLanguage: string = 'en'

    const rawTones: IToneEntity[] = await this.toneService.rawFindAll<IToneEntity>([
      {
        $project: {
          _id: 1,
          name: { $ifNull: [`$name.${customLang}`, `$name.${defaultLanguage}`] },
        },
      },
    ])

    return { data: rawTones }
  }
}
