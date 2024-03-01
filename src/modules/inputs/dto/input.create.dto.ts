import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, IsNotEmpty, IsEnum, IsString } from 'class-validator'
import { ENUM_INPUT_TYPE } from '../constants/input.enum.constant'

export class InputCreateDto {
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
    example: true,
    required: true,
    description: 'Required flag of input',
  })
  readonly isRequired: boolean

  @IsEnum(ENUM_INPUT_TYPE)
  @IsString()
  @IsNotEmpty()
  readonly type: ENUM_INPUT_TYPE

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly category: string
}
