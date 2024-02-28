import { ApiProperty, OmitType } from '@nestjs/swagger'

import { PlanCreateDto } from './plan.create.dto'

export class PlanUpdateDto extends OmitType(PlanCreateDto, ['name', 'slug'] as const) {
  @ApiProperty({
    required: true,
    description: 'Active flag of plan',
    example: true,
  })
  readonly isActive: boolean
}
