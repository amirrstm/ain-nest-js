import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, MaxLength, IsUUID, IsEnum } from 'class-validator'
import { ENUM_OTP_TYPE } from '../constants/otp.enum.constant'

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
    example: 'MOBILE',
    description: 'Representative for otp type',
  })
  @IsEnum(ENUM_OTP_TYPE)
  @IsNotEmpty()
  readonly type: ENUM_OTP_TYPE

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string
}
