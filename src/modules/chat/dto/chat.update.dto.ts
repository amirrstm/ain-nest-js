import { PickType } from '@nestjs/swagger'
import { ChatCreateDto } from './chat.create.dto'

export class ChatUpdateDto extends PickType(ChatCreateDto, ['message'] as const) {}
