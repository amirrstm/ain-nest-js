import { faker } from '@faker-js/faker'

export const PlanDocParamsId = [
  {
    name: 'plan',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.string.uuid(),
  },
]
