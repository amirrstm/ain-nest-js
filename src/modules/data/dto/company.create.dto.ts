import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'

export class CompanyCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of company',
    example: faker.internet.displayName(),
  })
  readonly name: string
}
