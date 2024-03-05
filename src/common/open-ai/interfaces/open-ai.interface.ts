import { ENUM_AI_ROLE } from '../constants/open-ai.enum.constant'

export interface IPromptMessage {
  role: ENUM_AI_ROLE
  content: string
}

export interface IPromptOptions {
  temperature: number
  max_tokens: number
}
