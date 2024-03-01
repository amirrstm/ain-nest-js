import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsUUID } from 'class-validator'

class HistoryInputValuesDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly input: string

  @ApiProperty({
    required: true,
    description: 'Value of input',
    example: faker.internet.userName(),
  })
  @IsString()
  @IsNotEmpty()
  value: string
}

export class HistoryCreateDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly category: string

  @ApiProperty({
    required: true,
    description: 'input value list of history',
    isArray: true,
    default: [],
    example: [
      {
        input: faker.string.uuid(),
        value: 'Some Text',
      },
    ],
    type: HistoryInputValuesDto,
  })
  @Type(() => HistoryInputValuesDto)
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  readonly inputValues: HistoryInputValuesDto[]
}
