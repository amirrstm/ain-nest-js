import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IOpenAIService } from '../interfaces/open-ai.service.interface'
import OpenAI from 'openai'
import { ChatCompletion } from 'openai/resources'
import { IPromptMessage, IPromptOptions } from '../interfaces/open-ai.interface'

@Injectable()
export class OpenAIService implements IOpenAIService {
  private readonly aiClient: OpenAI

  constructor(private readonly configService: ConfigService) {
    this.aiClient = new OpenAI({
      timeout: 60000,
      apiKey: this.configService.get<string>('open-ai.secretKey'),
    })
  }

  async getMessageFromPrompt(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion> {
    if (messages.length === 0) {
      return
    }

    const completion: ChatCompletion = await this.aiClient.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.5,
      max_tokens: 2000,
      ...options,
    })
    return completion
  }
}
