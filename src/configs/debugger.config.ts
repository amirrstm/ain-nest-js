import ms from 'ms'

import { registerAs } from '@nestjs/config'

export default registerAs(
  'debugger',
  (): Record<string, any> => ({
    writeIntoFile: process.env.DEBUGGER_WRITE_INTO_FILE === 'true',
    maxFiles: '7d',
    maxSize: '2m',
    sentry: {
      enable: true,
      dsn: process.env.SENTRY_DSN,
      timeout: ms('10s'),
      logLevels: ['fatal'],
    },
  })
)
