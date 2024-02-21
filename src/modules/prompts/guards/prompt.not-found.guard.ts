import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PromptDoc } from '../repository/entities/prompt.entity'
import { ENUM_PROMPT_STATUS_CODE_ERROR } from '../constants/prompt.status-code.constant'

@Injectable()
export class PromptNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __prompt } = context.switchToHttp().getRequest<IRequestApp & { __prompt: PromptDoc }>()

    if (!__prompt) {
      throw new NotFoundException({
        statusCode: ENUM_PROMPT_STATUS_CODE_ERROR.PROMPT_NOT_FOUND_ERROR,
        message: 'prompt.error.notFound',
      })
    }

    return true
  }
}
