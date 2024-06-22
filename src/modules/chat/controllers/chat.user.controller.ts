import { Body, ConflictException, Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PlanService } from 'src/modules/plan/services/plan.service'
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { UserPlanService } from 'src/modules/user-plan/services/user-plan.service'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { UserPlanDoc } from 'src/modules/user-plan/repository/entities/user-plan.entity'
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant'

import { ENUM_AI_ROLE } from 'src/common/sms/constants/sms.enum.constant'
import { OpenAIService } from 'src/common/open-ai/services/open-ai.service'
import { IPromptMessage } from 'src/common/open-ai/interfaces/open-ai.interface'

import { ChatService } from '../services/chat.service'
import { ChatMessagesDto } from '../dto/chat.message.dto'
import { ENUM_CHAT_ROLE } from '../constants/chat.constant'
import { ChatUSerDeleteDoc, ChatUserCreateDoc, ChatUserGetDoc } from '../docs/chat.user.doc'
import { ChatGetSerialization } from '../serializations/chat.get.serialization'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'
import { AI_LANG } from 'src/common/open-ai/constants/ai.constant'

@ApiTags('Modules.User.Chat')
@Controller({ version: '1', path: '/chat' })
export class ChatUserController {
  constructor(
    private readonly aiService: OpenAIService,
    private readonly chatService: ChatService,
    private readonly planService: PlanService,
    private readonly userPlanService: UserPlanService
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
  async message(
    @GetUser() user: UserDoc,
    @Body() body: ChatMessagesDto,
    @RequestCustomLang() customLang: string[]
  ): Promise<IResponse> {
    const lang = customLang[0]
    const systemPrompt = `${AI_LANG(lang)}`
    const chat = await this.chatService.findOne({ user: user._id })

    const userPlan: UserPlanDoc = await this.userPlanService.findOne({ user: user._id })

    if (!userPlan) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
        message: 'user.error.notFound',
      })
    }

    const desiredPlan = await this.planService.findOneById(userPlan.plan)
    if (userPlan.used.generation === desiredPlan.generation) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PLAN_GENERATION_ERROR,
        message: 'user.error.planGeneration',
      })
    }

    if (chat) {
      const messages: IPromptMessage[] = [{ content: systemPrompt, role: ENUM_AI_ROLE.SYSTEM }]

      chat.messages.forEach(message => {
        messages.push({
          content: message.content,
          role: message.role === ENUM_CHAT_ROLE.USER ? ENUM_AI_ROLE.USER : ENUM_AI_ROLE.ASSISTANT,
        })
      })

      messages.push({ role: ENUM_AI_ROLE.USER, content: body.content })

      await this.chatService.update(chat, { message: body })
      const aiResponse = await this.aiService.getChatFromPrompt(messages)

      await this.chatService.update(chat, {
        message: { role: ENUM_CHAT_ROLE.ASSISTANT, content: aiResponse.choices[0].message.content },
      })

      return { data: chat }
    }

    const newChat = await this.chatService.create({ user: user._id, message: body })
    const messages: IPromptMessage[] = [{ content: systemPrompt, role: ENUM_AI_ROLE.SYSTEM }]

    messages.push({ role: ENUM_AI_ROLE.USER, content: body.content })

    const aiResponse = await this.aiService.getChatFromPrompt(messages, { max_tokens: 1500, temperature: 0.6 })
    await this.userPlanService.update(userPlan, {
      used: { ...userPlan.used, generation: userPlan.used.generation + 1 },
    })

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
