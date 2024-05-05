import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class AuthLinkedinPayloadDataSerialization {
  @ApiProperty({
    required: false,
    nullable: true,
  })
  accessToken: string
}

export class AuthLinkedinPayloadSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: AuthLinkedinPayloadDataSerialization,
  })
  @Type(() => AuthLinkedinPayloadDataSerialization)
  user: AuthLinkedinPayloadDataSerialization
}
