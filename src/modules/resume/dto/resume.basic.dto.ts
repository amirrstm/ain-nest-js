import { faker } from '@faker-js/faker'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

class Location {
  @ApiProperty({
    required: false,
    example: faker.location.city(),
    description: 'City of the location',
  })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({
    required: false,
    example: faker.location.state(),
    description: 'State of the location',
  })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({
    required: false,
    example: faker.location.country(),
    description: 'Country of the location',
  })
  @IsOptional()
  @IsString()
  country?: string

  @ApiProperty({
    required: false,
    example: faker.location.streetAddress(),
    description: 'Address of the location',
  })
  @IsOptional()
  @IsString()
  address?: string
}

export class ResumeBasicDTO {
  @ApiProperty({
    required: false,
    example: faker.internet.url(),
    description: 'URL of the resume',
  })
  @IsOptional()
  @IsString()
  url?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.word(),
    description: 'Label of the resume',
  })
  @IsOptional()
  @IsString()
  label?: string

  @ApiProperty({
    required: false,
    example: faker.image.imageUrl(),
    description: 'Image URL of the resume',
  })
  @IsOptional()
  @IsString()
  image?: string

  @ApiProperty({
    required: false,
    example: faker.internet.email(),
    description: 'Email of the resume',
  })
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty({
    required: false,
    example: faker.phone.number(),
    description: 'Phone number of the resume',
  })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({
    required: false,
    example: faker.person.firstName(),
    description: 'First name of the resume owner',
  })
  @IsOptional()
  @IsString()
  firstName?: string

  @ApiProperty({
    required: false,
    example: faker.person.lastName(),
    description: 'Last name of the resume owner',
  })
  @IsOptional()
  @IsString()
  lastName?: string

  @ApiProperty({
    required: false,
    example: faker.lorem.paragraph(),
    description: 'Summary of the resume',
  })
  @IsOptional()
  @IsString()
  summary?: string

  @ApiProperty({
    required: false,
    description: 'Location of the resume owner',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location
}
