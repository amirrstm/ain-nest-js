import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, MaxLength, IsUUID } from 'class-validator'

export class OtpCreateDto {
  @ApiProperty({
    example: faker.string.fromCharacters('1234567890', {
      max: 6,
      min: 6,
    }),
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(6)
  @Type(() => String)
  readonly code: string

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string
}
