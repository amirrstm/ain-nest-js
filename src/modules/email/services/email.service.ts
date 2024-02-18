import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IEmailService } from 'src/modules/email/interfaces/email.service.interface'

@Injectable()
export class EmailService implements IEmailService {
  private readonly appName: string
  private readonly fromEmail: string

  constructor(private readonly configService: ConfigService) {
    this.appName = this.configService.get<string>('app.name')
    this.fromEmail = this.configService.get<string>('email.fromEmail')
  }
}
