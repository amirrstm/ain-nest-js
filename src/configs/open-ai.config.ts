import { registerAs } from '@nestjs/config'

export default registerAs(
  'open-ai',
  (): Record<string, any> => ({
    secretKey: process.env.OPEN_AI_SECRET_KEY,
  })
)
