import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { MaxLength, IsNumber, IsNotEmpty, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator'
import { PLAN_ENUM_MODEL } from '../constants/plan.constant'

class PlanModelsDto {
  @ApiProperty({
    required: true,
    description: 'Model type',
    enum: PLAN_ENUM_MODEL,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PLAN_ENUM_MODEL)
  type: PLAN_ENUM_MODEL

  @ApiProperty({
    required: true,
    description: 'Name of model',
    example: faker.internet.userName(),
  })
  @IsString()
  @IsNotEmpty()
  name: string
}

export class PlanCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of plan',
    example: {
      en: faker.internet.displayName(),
    },
  })
  @Type(() => Object)
  readonly name: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Description of plan',
    example: {
      en: faker.lorem.sentence(),
    },
  })
  @Type(() => Object)
  readonly description: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Slug for plan',
    example: faker.internet.displayName(),
  })
  @MaxLength(100)
  @Type(() => String)
  readonly slug: string

  @ApiProperty({
    required: true,
    description: 'Generation count of plan',
    example: faker.number.int({ min: 10, max: 1000 }),
  })
  @IsNumber()
  @Type(() => Number)
  readonly generation: number

  @ApiProperty({
    default: [],
    isArray: true,
    required: true,
    description: 'Feature list of plan',
    example: [faker.internet.domainName()],
  })
  @IsNotEmpty()
  @IsArray()
  readonly features: string[]

  @ApiProperty({
    required: true,
    description: 'Price of plan',
    example: faker.finance.amount(),
  })
  @IsNumber()
  @Type(() => Number)
  readonly price: number

  @ApiProperty({
    example: true,
    required: true,
    description: 'Off for annual plan',
  })
  @IsNotEmpty()
  readonly offForAnnual: boolean

  @ApiProperty({
    example: true,
    required: true,
    description: 'Default plan',
  })
  @IsNotEmpty()
  readonly isDefault: boolean

  @ApiProperty({
    required: true,
    description: 'Model list of plan',
    isArray: true,
    default: [],
    example: [
      {
        type: PLAN_ENUM_MODEL.TEXT,
        name: 'GPT-3.5-Turbo',
      },
    ],
    type: PlanModelsDto,
  })
  @Type(() => PlanModelsDto)
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  readonly models: PlanModelsDto[]
}
