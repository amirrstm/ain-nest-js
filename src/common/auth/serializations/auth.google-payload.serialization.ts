import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class AuthGooglePayloadDataSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  email: string

  @ApiProperty({
    required: false,
    nullable: true,
  })
  firstName: string

  @ApiProperty({
    required: false,
    nullable: true,
  })
  lastName: string

  @ApiProperty({
    required: false,
    nullable: true,
  })
  picture: string

  @ApiProperty({
    required: false,
    nullable: true,
  })
  accessToken: string
}

export class AuthGooglePayloadSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: AuthGooglePayloadDataSerialization,
  })
  @Type(() => AuthGooglePayloadDataSerialization)
  user: AuthGooglePayloadDataSerialization
}
