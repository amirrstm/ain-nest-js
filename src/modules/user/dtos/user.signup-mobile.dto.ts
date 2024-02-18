import { PickType } from '@nestjs/swagger'
import { UserCreateDto } from './user.create.dto'

export class UserSignUpMobileDto extends PickType(UserCreateDto, ['mobileNumber'] as const) {}
