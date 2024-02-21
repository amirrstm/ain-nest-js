import { faker } from '@faker-js/faker'

export const PromptDocParamsId = [
  {
    name: 'prompt',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.string.uuid(),
  },
]
