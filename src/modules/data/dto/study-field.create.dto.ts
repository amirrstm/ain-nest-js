import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'

export class StudyFieldCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of field',
    example: faker.internet.displayName(),
  })
  readonly name: string
}
