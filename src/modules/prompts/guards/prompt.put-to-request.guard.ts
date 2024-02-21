import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { IRequestApp } from 'src/common/request/interfaces/request.interface'

import { PromptService } from '../services/prompt.service'
import { PromptDoc } from '../repository/entities/prompt.entity'

@Injectable()
export class PromptPutToRequestGuard implements CanActivate {
  constructor(private readonly promptService: PromptService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestApp & { __prompt: PromptDoc }>()
    const { params } = request
    const { prompt } = params

    const check: PromptDoc = await this.promptService.findOneById(prompt, { join: true })
    request.__prompt = check

    return true
  }
}
