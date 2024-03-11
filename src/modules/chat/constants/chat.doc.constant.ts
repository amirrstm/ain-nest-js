import { faker } from '@faker-js/faker'

export const ChatDocParamsId = [
  {
    name: 'chat',
    required: true,
    type: 'string',
    allowEmptyValue: false,
    example: faker.string.uuid(),
  },
]
