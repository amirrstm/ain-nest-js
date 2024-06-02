import OpenAI from 'openai'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IOpenAIService } from '../interfaces/open-ai.service.interface'

import { ChatCompletion, ImagesResponse } from 'openai/resources'
import { IPromptMessage, IPromptOptions } from '../interfaces/open-ai.interface'

@Injectable()
export class OpenAIService implements IOpenAIService {
  private readonly openAI: OpenAI

  constructor(private readonly configService: ConfigService) {
    this.openAI = new OpenAI({
      timeout: 80000,
      apiKey: this.configService.get('open-ai.secretKey'),
    })
  }

  async getMessageFromPrompt(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion> {
    if (messages.length === 0) {
      return
    }

    return await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.5,
      max_tokens: 2000,
      ...options,
    })
  }

  async generateImage(prompt: string, options?: IPromptOptions): Promise<ImagesResponse> {
    return await this.openAI.images.generate({
      n: 1,
      prompt,
      size: '1024x1024',
      model: 'dall-e-3',
      quality: 'standard',
      ...options,
    })
  }

  async getMessageFromGpt4(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion> {
    if (messages.length === 0) {
      return
    }

    return await this.openAI.chat.completions.create({
      model: 'gpt-4o',
      messages: messages.map(message => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
      ...options,
    })
  }

  async transcribeAudio(audioBuffer: Buffer, language = 'en'): Promise<string> {
    const blob = new Blob([audioBuffer], { type: 'audio/wav' })
    const file = new File([blob], 'input.wav', { type: 'audio/wav' })

    try {
      const whisperResponse = await this.openAI.audio.transcriptions.create({
        file,
        language,
        model: 'whisper-1',
        response_format: 'json',
      })

      return whisperResponse.text
    } catch (e) {
      console.error(e)
    }
  }
}
