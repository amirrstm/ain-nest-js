import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, MaxLength, MinLength, IsUUID } from 'class-validator'

export class UserVerifyMobileDto {
  @ApiProperty({
    example: `${faker.string.fromCharacters('1234567890', {
      max: 6,
      min: 6,
    })}`,
    required: false,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @Type(() => String)
  readonly code?: string

  @ApiProperty({
    example: faker.string.uuid(),
    required: true,
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly userId: string
}
