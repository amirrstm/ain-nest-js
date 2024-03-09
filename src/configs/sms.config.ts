import { registerAs } from '@nestjs/config'

export default registerAs(
  'sms',
  (): Record<string, any> => ({
    apiKey: process.env.SMS_API_KEY,
  })
)
