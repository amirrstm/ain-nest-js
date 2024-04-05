import { IResult } from 'ua-parser-js'
import { ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'

import { AppHelloDoc } from 'src/app/docs/app.doc'
import { Response } from 'src/common/response/decorators/response.decorator'
import { RequestUserAgent } from 'src/common/request/decorators/request.decorator'

import { HelperDateService } from 'src/common/helper/services/helper.date.service'
import { AppHelloSerialization } from 'src/app/serializations/app.hello.serialization'

@ApiTags('App Test')
@Controller({ version: VERSION_NEUTRAL, path: '/' })
export class AppController {
  private readonly serviceName: string

  constructor(
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService
  ) {
    this.serviceName = this.configService.get<string>('app.name')
  }

  @AppHelloDoc()
  @Response('app.hello', { serialization: AppHelloSerialization })
  @Get('/hello')
  async hello(@RequestUserAgent() userAgent: IResult): Promise<any> {
    const newDate = this.helperDateService.create()

    return {
      _metadata: {
        customProperty: {
          messageProperties: {
            serviceName: this.serviceName,
          },
        },
      },
      data: {
        userAgent,
        date: newDate,
        format: this.helperDateService.format(newDate),
        timestamp: this.helperDateService.timestamp(newDate),
      },
    }
  }
}
