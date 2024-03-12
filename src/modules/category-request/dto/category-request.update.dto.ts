import { PickType } from '@nestjs/swagger'
import { CategoryRequestCreateDto } from './category-request.create.dto'

export class CategoryRequestUpdateDto extends PickType(CategoryRequestCreateDto, ['name', 'description'] as const) {}
