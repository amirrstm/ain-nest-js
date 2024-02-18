import { PickType } from '@nestjs/swagger'
import { OtpCreateDto } from './otp.create.dto'

export class OtpUpdateCodeDto extends PickType(OtpCreateDto, ['code'] as const) {}
