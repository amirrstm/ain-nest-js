import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PROMPT_IS_ACTIVE_META_KEY } from '../constants/prompt.constant'
import { PromptPutToRequestGuard } from '../guards/prompt.put-to-request.guard'
import { PromptNotFoundGuard } from '../guards/prompt.not-found.guard'
import { PromptDoc } from '../repository/entities/prompt.entity'

export function PromptAdminGetGuard(): MethodDecorator {
  return applyDecorators(UseGuards(PromptPutToRequestGuard, PromptNotFoundGuard))
}

export function PromptAdminUpdateGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(PromptPutToRequestGuard, PromptNotFoundGuard),
    SetMetadata(PROMPT_IS_ACTIVE_META_KEY, [true])
  )
}

export function PromptAdminDeleteGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(PromptPutToRequestGuard, PromptNotFoundGuard),
    SetMetadata(PROMPT_IS_ACTIVE_META_KEY, [true])
  )
}

export const GetPrompt = createParamDecorator(<T>(returnPlain: boolean, ctx: ExecutionContext): T => {
  const { __prompt } = ctx.switchToHttp().getRequest<IRequestApp & { __prompt: PromptDoc }>()

  if (returnPlain) {
    const obj = __prompt.toObject()
    obj.description = Object.fromEntries(obj.description)

    if (obj.category) {
      obj.category.name = Object.fromEntries(obj.category.name)
      obj.category.description = Object.fromEntries(obj.category.description)
    }

    return obj as T
  }

  return __prompt as T
})
