import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'

export class OccupationCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of Occupation',
    example: faker.internet.displayName(),
  })
  readonly name: string
}
