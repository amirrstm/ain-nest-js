import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'

import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { InputDoc } from '../repository/entities/input.entity'
import { INPUT_IS_ACTIVE_META_KEY } from '../constants/input.main.constant'
import { ENUM_INPUT_STATUS_CODE_ERROR } from '../constants/input.status-code.constant'

@Injectable()
export class InputActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(INPUT_IS_ACTIVE_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!required) {
      return true
    }

    const { __input } = context.switchToHttp().getRequest<IRequestApp & { __input: InputDoc }>()

    if (!required.includes(__input.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_INPUT_STATUS_CODE_ERROR.INPUT_IS_ACTIVE_ERROR,
        message: 'input.error.isActiveInvalid',
      })
    }
    return true
  }
}
