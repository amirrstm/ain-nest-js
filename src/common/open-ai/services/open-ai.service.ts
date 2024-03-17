import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IOpenAIService } from '../interfaces/open-ai.service.interface'

import { ChatCompletion } from 'openai/resources'
import { IPromptMessage, IPromptOptions } from '../interfaces/open-ai.interface'

import axios, { AxiosResponse } from 'axios'
import OpenAI from 'openai'

@Injectable()
export class OpenAIService implements IOpenAIService {
  private readonly openAI: OpenAI

  constructor(private readonly configService: ConfigService) {
    this.openAI = new OpenAI({
      timeout: 80000,
      apiKey: this.configService.get('open-ai.secretKey'),
    })
  }

  async getMessageFromAIPrompt(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion> {
    if (messages.length === 0) {
      return
    }

    return await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      // model: 'gpt-4-0125-preview',
      messages: messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.5,
      max_tokens: 2000,
      ...options,
    })
  }

  async getMessageFromPrompt(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion> {
    if (messages.length === 0) {
      return
    }

    try {
      const completion: AxiosResponse<ChatCompletion> = await axios.post('http://ai.ainevis.com/v1/ai/prompt', {
        model: 'gpt-3.5-turbo-0125',
        // model: 'gpt-4-0125-preview',
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
