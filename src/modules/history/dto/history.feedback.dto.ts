import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested, IsOptional } from 'class-validator'

class HistoryFeedbackValueDto {
  @ApiProperty({
    required: true,
    description: 'If content is liked',
    example: true,
  })
  readonly liked: boolean

  @ApiProperty({
    required: true,
    description: 'Value of input',
    example: faker.internet.userName(),
  })
  @IsString()
  @IsOptional()
  text: string
}

export class HistoryFeedbackDto {
  @ApiProperty({
    required: true,
    description: 'Feedback of history',
    example: {
      liked: false,
      text: 'Some Text',
    },
    type: HistoryFeedbackValueDto,
  })
  @Type(() => HistoryFeedbackValueDto)
  @IsNotEmpty()
  @ValidateNested()
  readonly feedback: HistoryFeedbackValueDto
}
