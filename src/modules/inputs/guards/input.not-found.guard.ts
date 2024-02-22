import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { InputDoc } from '../repository/entities/input.entity'
import { ENUM_INPUT_STATUS_CODE_ERROR } from '../constants/input.status-code.constant'

@Injectable()
export class InputNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __input } = context.switchToHttp().getRequest<IRequestApp & { __input: InputDoc }>()

    if (!__input) {
      throw new NotFoundException({
        statusCode: ENUM_INPUT_STATUS_CODE_ERROR.INPUT_NOT_FOUND_ERROR,
        message: 'input.error.notFound',
      })
    }

    return true
  }
}
