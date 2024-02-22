import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { InputService } from '../services/input.service'
import { InputDoc } from '../repository/entities/input.entity'

@Injectable()
export class InputPutToRequestGuard implements CanActivate {
  constructor(private readonly inputService: InputService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __input: InputDoc }>()
    const { params } = request
    const { input } = params

    const check: InputDoc = await this.inputService.findOneById(input, { join: true })
    request.__input = check

    return true
  }
}
