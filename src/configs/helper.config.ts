import { seconds } from 'src/common/helper/constants/helper.function.constant'

import { registerAs } from '@nestjs/config'

export default registerAs(
  'helper',
  (): Record<string, any> => ({
    salt: {
      length: 8,
    },
    jwt: {
      secretKey: '123456',
      expirationTime: seconds('1h'),
      notBeforeExpirationTime: seconds('0'),
    },
  })
)
