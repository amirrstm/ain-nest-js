import { faker } from '@faker-js/faker'

export const InputDocParamsId = [
  {
    name: 'input',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.string.uuid(),
  },
]
