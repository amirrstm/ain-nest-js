import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsUUID, IsNotEmpty } from 'class-validator'

export class PromptCreateDto {
  @ApiProperty({
    required: true,
    description: 'Description of prompt',
    example: {
      en: faker.lorem.sentence(),
    },
  })
  @IsNotEmpty()
  @Type(() => Object)
  readonly description: Record<string, string>

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly category: string
}
