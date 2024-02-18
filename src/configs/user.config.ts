import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant'

import { registerAs } from '@nestjs/config'

export default registerAs(
  'user',
  (): Record<string, any> => ({
    uploadPath: process.env.NODE_ENV === ENUM_APP_ENVIRONMENT.PRODUCTION ? '/user/{user}' : '/test/user/{user}',
    mobileNumberCountryCodeAllowed: ['09'],
  })
)
