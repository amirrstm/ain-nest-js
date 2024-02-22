import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { INPUT_IS_ACTIVE_META_KEY } from '../constants/input.main.constant'
import { InputPutToRequestGuard } from '../guards/input.put-to-request.guard'
import { InputNotFoundGuard } from '../guards/input.not-found.guard'
import { InputDoc } from '../repository/entities/input.entity'

export function InputAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(InputPutToRequestGuard, InputNotFoundGuard))
}

export function InputAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(InputPutToRequestGuard, InputNotFoundGuard),
    SetMetadata(INPUT_IS_ACTIVE_META_KEY, [true])
  )
}

export function InputAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(InputPutToRequestGuard, InputNotFoundGuard),
    SetMetadata(INPUT_IS_ACTIVE_META_KEY, [true])
  )
}

export const GetInput = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __input } = ctx.switchToHttp().getRequest<IRequestApp & { __input: InputDoc }>()

  if (returnPlain) {
    const obj = __input.toObject()
    obj.title = Object.fromEntries(obj.title)
    obj.placeholder = Object.fromEntries(obj.placeholder)
    obj.description = Object.fromEntries(obj.description)

    if (obj.category) {
      obj.category.name = Object.fromEntries(obj.category.name)
      obj.category.description = Object.fromEntries(obj.category.description)
    }

    return obj as T
  }

  return __input as T
})
