import { sprintf } from 'sprintf-js'
import { Body, ConflictException, Controller, Delete, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserService } from 'src/modules/user/services/user.service'
import { PlanService } from 'src/modules/plan/services/plan.service'
import { InputService } from 'src/modules/inputs/services/input.service'
import { PromptService } from 'src/modules/prompts/services/prompt.service'
import { HistoryService } from 'src/modules/history/services/history.service'
import { CategoryService } from 'src/modules/category/services/category.service'

import { APP_LANGUAGE } from 'src/app/constants/app.constant'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { OpenAIService } from 'src/common/open-ai/services/open-ai.service'
import { Response } from 'src/common/response/decorators/response.decorator'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { GetUser, UserProtected } from 'src/modules/user/decorators/user.decorator'
import { UserPlanDoc } from 'src/modules/user-plan/repository/entities/user-plan.entity'
import { AuthJwtUserAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator'
import { UserUserDeleteSelfDoc, UserUserPromptDoc, UserUserUpdateNameDoc } from 'src/modules/user/docs/user.user.doc'

import { UserPromptDto } from '../dtos/user.prompt.dto'
import { UserUpdateNameDto } from '../dtos/user.update-name.dto'
import { UserImagePromptDto } from '../dtos/user.prompt.image.dto'
import { PROMPT_LANGUAGES, SYSTEM_PROMPT_MESSAGE } from '../constants/user.ai.constant'

import { IInputDoc } from 'src/modules/inputs/interfaces/prompt.interface'
import { IPromptMessage } from 'src/common/open-ai/interfaces/open-ai.interface'
import { ENUM_AI_ROLE } from 'src/common/open-ai/constants/open-ai.enum.constant'
import { UserPlanService } from 'src/modules/user-plan/services/user-plan.service'
import { RequestCustomLang } from 'src/common/request/decorators/request.decorator'
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant'
import { ENUM_PROMPT_STATUS_CODE_ERROR } from 'src/modules/prompts/constants/prompt.status-code.constant'
import { ENUM_CATEGORY_STATUS_CODE_ERROR } from 'src/modules/category/constants/category.status-code.constant'
import { ToneService } from 'src/modules/data/services/tone.service'

@ApiTags('Module.User.User')
@Controller({
  version: '1',
  path: '/user',
})
export class UserUserController {
  constructor(
    private readonly planService: PlanService,
    private readonly userService: UserService,
    private readonly aiService: OpenAIService,
    private readonly toneService: ToneService,
    private readonly inputService: InputService,
    private readonly promptService: PromptService,
    private readonly historyService: HistoryService,
    private readonly categoryService: CategoryService,
    private readonly userPlanService: UserPlanService
  ) {}

  @UserUserPromptDoc()
  @Response('user.prompt')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Put('/prompt')
  async questionPrompt(
    @GetUser() user: UserDoc,
    @Body() body: UserPromptDto,
    @RequestCustomLang() customLang: string
  ): Promise<IResponse> {
    const lang = customLang || APP_LANGUAGE
    const userPlan: UserPlanDoc = await this.userPlanService.findOne({ user: user._id })

    if (!userPlan) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
        message: 'user.error.notFound',
      })
    }

    const desiredPlan = await this.planService.findOneById(userPlan.plan)
    if (userPlan.used === desiredPlan.generation) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PLAN_GENERATION_ERROR,
        message: 'user.error.planGeneration',
      })
    }

    const category = await this.categoryService.findOneById(body.category)
    if (!category) {
      throw new ConflictException({
        statusCode: ENUM_CATEGORY_STATUS_CODE_ERROR.CATEGORY_NOT_FOUND_ERROR,
        message: 'category.error.notFound',
      })
    }

    const prompt = await this.promptService.findOne({ category: category._id }, { plainObject: true })
    if (!prompt) {
      throw new ConflictException({
        statusCode: ENUM_PROMPT_STATUS_CODE_ERROR.PROMPT_NOT_FOUND_ERROR,
        message: 'prompt.error.notFound',
      })
    }

    const inputs = await this.inputService.findAllWithTranslation<IInputDoc>(lang, { category: category._id })

    if (!inputs || inputs.length === 0) {
      throw new ConflictException({
        statusCode: ENUM_PROMPT_STATUS_CODE_ERROR.PROMPT_NOT_FOUND_ERROR,
        message: 'input.error.notFound',
      })
    }

    let inputContent = ''

    inputs.forEach(input => {
      if (body.inputs[input.name] && body.inputs[input.name].length > 0) {
        const keyName = input.name
        inputContent += sprintf(input.description, body.inputs[keyName])
      }
    })

    const tone = await this.toneService.findOneById(body.tone, { plainObject: true })

    const language = PROMPT_LANGUAGES[lang as keyof typeof PROMPT_LANGUAGES]

    const variant = String(body.variant)
    const desiredTone = tone.name['en']
    const systemPrompt = prompt.description[lang]
    const SYSTEM_MESSAGE = sprintf(SYSTEM_PROMPT_MESSAGE, language, systemPrompt, desiredTone, variant)

    const messages: IPromptMessage[] = [
      {
        role: ENUM_AI_ROLE.SYSTEM,
        content: SYSTEM_MESSAGE,
      },
      {
        role: ENUM_AI_ROLE.USER,
        content: inputContent,
      },
    ]

    const aiResponse = await this.aiService.getMessageFromPrompt(messages, {
      temperature: body.temperature,
      max_tokens: category.maxTokens ?? 3000,
    })

    await this.userPlanService.update(userPlan, { used: userPlan.used + body.variant })
    const createdHistory = await this.historyService.create({
      user: user._id,
      category: category._id,
      inputValues: inputs.map(input => ({
        input: input._id,
        value: body.inputs[input.name],
      })),
      content: aiResponse.choices[0].message.content,
    })

    return { data: createdHistory }
  }

  @UserUserPromptDoc()
  @Response('user.prompt')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Post('/image-prompt')
  async imagePrompt(@GetUser() user: UserDoc, @Body() body: UserImagePromptDto): Promise<IResponse> {
    const data = await this.aiService.generateImage(body.prompt)

    return { data: data }
  }

  @UserUserUpdateNameDoc()
  @Response('user.updateProfile')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Put('/update-name')
  async updateProfile(@GetUser() user: UserDoc, @Body() body: UserUpdateNameDto): Promise<IResponse> {
    const userUpdated = await this.userService.updateName(user, body)

    return { data: userUpdated }
  }

  @UserUserDeleteSelfDoc()
  @Response('user.deleteSelf')
  @UserProtected()
  @AuthJwtUserAccessProtected()
  @Delete('/delete')
  async deleteSelf(@GetUser() user: UserDoc): Promise<void> {
    await this.userService.inactivePermanent(user)

    return
  }
}
