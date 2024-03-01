import { faker } from '@faker-js/faker'

export const HistoryDocParamsId = [
  {
    name: 'history',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.string.uuid(),
  },
]
