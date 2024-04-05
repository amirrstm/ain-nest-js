import { registerAs } from '@nestjs/config'

export default registerAs(
  'aws',
  (): Record<string, any> => ({
    s3: {
      credential: {
        key: process.env.AWS_S3_CREDENTIAL_KEY,
        secret: process.env.AWS_S3_CREDENTIAL_SECRET,
      },
      region: process.env.AWS_S3_REGION,
      endpoint: process.env.AWS_S3_ENDPOINT,
      bucket: process.env.AWS_S3_BUCKET ?? 'bucket',
      baseUrl: `https://storage.${process.env.AWS_S3_BUCKET}.com`,
    },
  })
)
