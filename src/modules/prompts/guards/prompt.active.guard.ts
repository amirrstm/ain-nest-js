import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PromptDoc } from '../repository/entities/prompt.entity'
import { PROMPT_IS_ACTIVE_META_KEY } from '../constants/prompt.constant'
import { ENUM_PROMPT_STATUS_CODE_ERROR } from '../constants/prompt.status-code.constant'

@Injectable()
export class PromptActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(PROMPT_IS_ACTIVE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!required) {
      return true
    }

    const { __prompt } = context.switchToHttp().getRequest<IRequestApp & { __prompt: PromptDoc }>()

    if (!required.includes(__prompt.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_PROMPT_STATUS_CODE_ERROR.PROMPT_IS_ACTIVE_ERROR,
        message: 'prompt.error.isActiveInvalid',
      })
    }
    return true
  }
}
