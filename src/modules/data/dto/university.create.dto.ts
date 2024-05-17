import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'

export class UniversityCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of university',
    example: faker.internet.displayName(),
  })
  readonly name: string
}
