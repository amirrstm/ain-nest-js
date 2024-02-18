import { APP_LANGUAGE } from 'src/app/constants/app.constant'
import { ENUM_MESSAGE_LANGUAGE } from 'src/common/message/constants/message.enum.constant'

import { registerAs } from '@nestjs/config'

export default registerAs(
  'message',
  (): Record<string, any> => ({
    availableLanguage: Object.values(ENUM_MESSAGE_LANGUAGE),
    language: process.env.APP_LANGUAGE ?? APP_LANGUAGE,
  })
)
