import { faker } from '@faker-js/faker'
import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsNotEmpty } from 'class-validator'

export class UserPlanCreateDto {
  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly plan: string

  @ApiProperty({
    required: true,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly user: string
}
