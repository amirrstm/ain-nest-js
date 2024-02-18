import { ApiProperty } from '@nestjs/swagger'

export class HealthSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    example: 'ok',
  })
  status: string

  @ApiProperty({
    required: true,
    nullable: false,
    example: {
      database: {
        status: 'up',
      },
    },
  })
  info: Record<string, any>

  @ApiProperty({
    required: true,
    nullable: false,
    example: {},
  })
  error: Record<string, any>

  @ApiProperty({
    required: true,
    nullable: false,
    example: {
      database: {
        status: 'up',
      },
    },
  })
  details: Record<string, any>
}
