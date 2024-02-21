import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PromptUpdateDto {
  @ApiProperty({
    required: true,
    description: 'Description of prompt',
    example: {
      en: faker.lorem.sentence(),
    },
  })
  @Type(() => Object)
  readonly description: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Active flag of prompt',
    example: true,
  })
  readonly isActive: boolean
}
