import { faker } from '@faker-js/faker'

import { ENUM_TEMPLATE_TYPE } from './template.enum.constant'

export const TemplateDocQueryIsActive = [
  {
    name: 'isActive',
    allowEmptyValue: true,
    required: false,
    type: 'string',
    example: 'true,false',
    description: "boolean value with ',' delimiter",
  },
]

export const TemplateDocQueryType = [
  {
    name: 'type',
    allowEmptyValue: true,
    required: false,
    type: 'string',
    example: Object.values(ENUM_TEMPLATE_TYPE).join(','),
    description: "enum value with ',' delimiter",
  },
]

export const TemplateDocParamsId = [
  {
    required: true,
    type: 'string',
    name: 'template',
    allowEmptyValue: false,
    example: faker.string.uuid(),
  },
]
