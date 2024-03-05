import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class UserPromptDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
    description: 'The category of the prompt',
  })
  @IsUUID('4')
  @IsNotEmpty()
  readonly category: string

  @ApiProperty({
    required: true,
    example: {
      en: faker.lorem.sentence(),
    },
    description: 'The question to prompt',
  })
  @IsNotEmpty()
  @Type(() => Object)
  readonly inputs: Record<string, string>
}
