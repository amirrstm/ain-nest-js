import { PickType } from '@nestjs/swagger'
import { HistoryCreateDto } from './history.create.dto'

export class HistoryUpdateDto extends PickType(HistoryCreateDto, ['content', 'rawContent'] as const) {}
