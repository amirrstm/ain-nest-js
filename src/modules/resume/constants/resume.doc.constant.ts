import { faker } from '@faker-js/faker'

export const ResumeDocParamsId = [
  {
    name: 'resume',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.string.uuid(),
  },
]
