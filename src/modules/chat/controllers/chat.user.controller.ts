import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'

import { ENUM_AI_ROLE } from 'src/common/sms/constants/sms.enum.constant'
import { OpenAIService } from 'src/common/open-ai/services/open-ai.service'
import { IPromptMessage } from 'src/common/open-ai/interfaces/open-ai.interface'

import { ChatService } from '../services/chat.service'
import { ChatMessagesDto } from '../dto/chat.message.dto'
import { ENUM_CHAT_ROLE } from '../constants/chat.constant'
import { ChatUSerDeleteDoc, ChatUserCreateDoc, ChatUserGetDoc } from '../docs/chat.user.doc'
import { ChatGetSerialization } from '../serializations/chat.get.serialization'

@ApiTags('Modules.User.Chat')
@Controller({ version: '1', path: '/chat' })
export class ChatUserController {
  constructor(
    private readonly aiService: OpenAIService,
    private readonly chatService: ChatService
  ) {}

  @ChatUserGetDoc()
  @Response('chat.get', { serialization: ChatGetSerialization })
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Get('/')
  async get(@GetUser() user: UserDoc): Promise<IResponse> {
    const chat = await this.chatService.findOne({ user: user._id }, { plainObject: true })

    return { data: chat }
  }

  @ChatUserCreateDoc()
  @Response('chat.create')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Post('/message')
  async message(@GetUser() user: UserDoc, @Body() body: ChatMessagesDto): Promise<IResponse> {
    const chat = await this.chatService.findOne({ user: user._id })

    if (chat) {
      const messages: IPromptMessage[] = []

      chat.messages.forEach(message => {
        messages.push({
          content: message.content,
          role: message.role === ENUM_CHAT_ROLE.USER ? ENUM_AI_ROLE.USER : ENUM_AI_ROLE.ASSISTANT,
        })
      })

      messages.push({
        role: ENUM_AI_ROLE.USER,
        content: body.content,
      })

      await this.chatService.update(chat, { message: body })
      const aiResponse = await this.aiService.getMessageFromPrompt(messages)

      await this.chatService.update(chat, {
        message: { role: ENUM_CHAT_ROLE.ASSISTANT, content: aiResponse.choices[0].message.content },
      })

      return { data: chat }
    }

    const newChat = await this.chatService.create({ user: user._id, message: body })
    const messages: IPromptMessage[] = []

    messages.push({
      role: ENUM_AI_ROLE.USER,
      content: body.content,
    })

    const aiResponse = await this.aiService.getMessageFromPrompt(messages, { max_tokens: 1000, temperature: 0.6 })

    await this.chatService.update(newChat, {
      message: { role: ENUM_CHAT_ROLE.ASSISTANT, content: aiResponse.choices[0].message.content },
    })

    return { data: newChat }
  }

  @ChatUSerDeleteDoc()
  @Response('chat.delete')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Delete('/delete')
  async deleteSelf(@GetUser() user: UserDoc): Promise<void> {
    const chat = await this.chatService.findOne({ user: user._id })
    await this.chatService.delete(chat)

    return
  }
}
