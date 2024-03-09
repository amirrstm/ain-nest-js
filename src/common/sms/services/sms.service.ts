import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Smsir } from 'sms-typescript/lib'

import { ISmsService } from '../interfaces/sms.service.interface'

import { SMS_MOBILE_NUMBER, SMS_TEMPLATE_ID } from '../constants/sms.enum.constant'

@Injectable()
export class SmsService implements ISmsService {
  smsWebService!: any

  constructor(private readonly configService: ConfigService) {
    this.smsWebService = new Smsir(this.configService.get('sms.apiKey'), SMS_MOBILE_NUMBER)
  }

  async sendOtp({ mobile, otp }: { mobile: string; otp: string }): Promise<any> {
    return await this.smsWebService.SendVerifyCode(mobile, SMS_TEMPLATE_ID, [
      {
        name: 'code',
        value: otp,
      },
    ])
  }
}
