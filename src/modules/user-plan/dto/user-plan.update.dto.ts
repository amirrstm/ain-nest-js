import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class UserPlanUpdateDto {
  @ApiProperty({
    required: true,
    description: 'Description of category',
    example: {
      resumeAI: 1,
      generation: 1,
      resumeCustom: 1,
      resumeVoice: 1,
    },
  })
  @Type(() => Object)
  readonly used: Record<string, number>
}
