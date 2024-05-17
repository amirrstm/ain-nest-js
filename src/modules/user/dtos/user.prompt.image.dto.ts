import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class UserImagePromptDto {
  @ApiProperty({
    required: true,
    example: faker.word.sample(),
    description: 'The prompt of image',
  })
  @IsNotEmpty()
  readonly prompt: string
}
