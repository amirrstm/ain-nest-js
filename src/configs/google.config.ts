import { registerAs } from '@nestjs/config'

export default registerAs(
  'google',
  (): Record<string, any> => ({
    clientId: process.env.SSO_GOOGLE_CLIENT_ID,
    callbackUrl: process.env.SSO_GOOGLE_CALLBACK_URL,
    clientSecret: process.env.SSO_GOOGLE_CLIENT_SECRET,
  })
)
