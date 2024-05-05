import { registerAs } from '@nestjs/config'

export default registerAs(
  'linkedin',
  (): Record<string, any> => ({
    clientId: process.env.SSO_LINKEDIN_CLIENT_ID,
    callbackUrl: process.env.SSO_LINKEDIN_CALLBACK_URL,
    clientSecret: process.env.SSO_LINKEDIN_CLIENT_SECRET,
  })
)
