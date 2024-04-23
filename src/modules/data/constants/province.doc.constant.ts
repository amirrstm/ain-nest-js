import { faker } from '@faker-js/faker'

export const ProvinceDocParamsId = [
  {
    required: true,
    type: 'string',
    name: 'province',
    example: faker.string.uuid(),
  },
]
