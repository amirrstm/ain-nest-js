import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IOpenAIService } from '../interfaces/open-ai.service.interface'

import { ChatCompletion } from 'openai/resources'
import { IPromptMessage, IPromptOptions } from '../interfaces/open-ai.interface'

import axios, { AxiosResponse } from 'axios'

@Injectable()
export class OpenAIService implements IOpenAIService {
  constructor(private readonly configService: ConfigService) {}

  async getMessageFromPrompt(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion> {
    if (messages.length === 0) {
      return
    }

    try {
      const completion: AxiosResponse<ChatCompletion> = await axios.post('http://ai.ainevis.com/v1/ai/prompt', {
        model: 'gpt-3.5-turbo-0125',
        messages: messages.map(message => ({
          role: message.role,
          content: message.content,
        })),
        temperature: 0.5,
        max_tokens: 2000,
        ...options,
      })

      return completion.data
    } catch (e) {
      console.log(e)
    }
  }
}
