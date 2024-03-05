import { ChatCompletion } from 'openai/resources'
import { IPromptMessage, IPromptOptions } from './open-ai.interface'

export interface IOpenAIService {
  getMessageFromPrompt(messages: IPromptMessage[], options?: IPromptOptions): Promise<ChatCompletion>
}
