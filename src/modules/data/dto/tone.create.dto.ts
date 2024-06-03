import { faker } from '@faker-js/faker'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ToneCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of Tone',
    example: {
      en: faker.internet.displayName(),
      fa: faker.internet.displayName(),
    },
  })
  @Type(() => Object)
  readonly name: Record<string, string>
}
