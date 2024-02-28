import { ApiProperty } from '@nestjs/swagger'

export class UserPlanUpdateDto {
  @ApiProperty({
    required: true,
    example: 20,
    description: 'Usage of Plan',
  })
  readonly used: number
}
