import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'

export class SkillCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of skill',
    example: faker.internet.displayName(),
  })
  readonly name: string
}
