import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class InputUpdateDto {
  @ApiProperty({
    required: true,
    description: 'Title of input',
    example: {
      en: faker.lorem.text(),
    },
  })
  @IsNotEmpty()
  @Type(() => Object)
  readonly title: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Placeholder of input',
    example: {
      en: faker.lorem.sentence(),
    },
  })
  @IsNotEmpty()
  @Type(() => Object)
  readonly placeholder: Record<string, string>

  @ApiProperty({
    required: false,
    description: 'Description of input',
    example: {
      en: faker.lorem.sentence(),
    },
  })
  @Type(() => Object)
  readonly description?: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Name of input',
    example: faker.lorem.word(),
  })
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({
    example: true,
    required: true,
    description: 'Multiline flag of input',
  })
  readonly multiline: boolean

  @ApiProperty({
    required: true,
    description: 'Active flag of input',
    example: true,
  })
  readonly isActive: boolean
}
