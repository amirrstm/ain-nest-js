import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator'

class ProvinceCityDto {
  @ApiProperty({
    required: true,
    description: 'Name of City',
    example: {
      en: faker.internet.displayName(),
    },
  })
  @Type(() => Object)
  readonly name: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'Latitude of City',
    example: faker.location.latitude(),
  })
  readonly latitude: number

  @ApiProperty({
    required: true,
    description: 'Longitude of City',
    example: faker.location.longitude(),
  })
  readonly longitude: number
}

export class ProvinceCreateDto {
  @ApiProperty({
    required: true,
    description: 'Name of Province',
    example: {
      en: faker.internet.displayName(),
    },
  })
  @Type(() => Object)
  readonly name: Record<string, string>

  @ApiProperty({
    required: true,
    description: 'City list of province',
    isArray: true,
    default: [],
    example: [
      {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        name: { en: faker.internet.displayName() },
      },
    ],
    type: ProvinceCityDto,
  })
  @Type(() => ProvinceCityDto)
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  readonly cities: ProvinceCityDto[]

  @ApiProperty({
    required: true,
    description: 'Latitude of Province',
    example: faker.location.latitude(),
  })
  readonly latitude: number

  @ApiProperty({
    required: true,
    description: 'Longitude of Province',
    example: faker.location.longitude(),
  })
  readonly longitude: number
}
