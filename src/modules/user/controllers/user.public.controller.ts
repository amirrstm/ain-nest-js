import { ApiTags } from '@nestjs/swagger'
import { Body, ConflictException, Controller, Post } from '@nestjs/common'

import { SmsService } from 'src/common/sms/services/sms.service'
import { AuthService } from 'src/common/auth/services/auth.service'
import { RoleService } from 'src/modules/role/services/role.service'
import { PlanService } from 'src/modules/plan/services/plan.service'
import { Response } from 'src/common/response/decorators/response.decorator'
import { UserPlanService } from 'src/modules/user-plan/services/user-plan.service'

import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant'
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant'
import { UserPublicSignUpDoc, UserPublicSignUpMobileDoc } from 'src/modules/user/docs/user.public.doc'
import { UserSignUpDto } from 'src/modules/user/dtos/user.sign-up.dto'
import { UserDoc } from 'src/modules/user/repository/entities/user.entity'
import { UserService } from 'src/modules/user/services/user.service'
import { UserSignUpMobileDto } from 'src/modules/user/dtos/user.signup-mobile.dto'
import { IResponse } from 'src/common/response/interfaces/response.interface'
import { OtpService } from 'src/modules/otp/services/otp.service'
import { HelperNumberService } from 'src/common/helper/services/helper.number.service'
import { ENUM_OTP_TYPE } from 'src/modules/otp/constants/otp.enum.constant'
import { OtpDoc } from 'src/modules/otp/repository/entities/otp.entity'
import { IUserDoc } from '../interfaces/user.interface'
import { HelperDateService } from 'src/common/helper/services/helper.date.service'
import { ENUM_HELPER_DATE_DIFF } from 'src/common/helper/constants/helper.enum.constant'

@ApiTags('Modules.Public.User')
@Controller({
  version: '1',
  path: '/user',
})
export class UserPublicController {
  constructor(
    private readonly smsService: SmsService,
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly planService: PlanService,
    private readonly userPlanService: UserPlanService,
    private readonly helperDateService: HelperDateService,
    private readonly helperNumberService: HelperNumberService
  ) {}

  @UserPublicSignUpDoc()
  @Response('user.signUp')
  @Post('/sign-up')
  async signUp(
    @Body()
    { email, mobileNumber, ...body }: UserSignUpDto
  ): Promise<void> {
    const promises: Promise<any>[] = [this.roleService.findOneByName('user'), this.userService.existByEmail(email)]

    if (mobileNumber) {
      promises.push(this.userService.existByMobileNumber(mobileNumber))
    }

    const [role, emailExist, mobileNumberExist] = await Promise.all(promises)

    if (emailExist) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
        message: 'user.error.emailExist',
      })
    } else if (mobileNumberExist) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_MOBILE_NUMBER_EXIST_ERROR,
        message: 'user.error.mobileNumberExist',
      })
    }

    const password = await this.authService.createPassword(body.password)

    await this.userService.create(
      {
        email,
        mobileNumber,
        signUpFrom: ENUM_USER_SIGN_UP_FROM.PUBLIC,
        role: role._id,
        ...body,
      },
      password
    )

    return
  }

  @UserPublicSignUpMobileDoc()
  @Response('user.signUpMobile')
  @Post('/generate-mobile-otp')
  async signUpMobile(@Body() { mobileNumber }: UserSignUpMobileDto): Promise<IResponse> {
    const promises: Promise<any>[] = [this.roleService.findOneByName('user')]
    const [role] = await Promise.all(promises)

    if (!mobileNumber) {
      throw new ConflictException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_MOBILE_NUMBER_EXIST_ERROR,
        message: 'user.error.mobileNumberExist',
      })
    }

    const existUser = await this.userService.findOneByMobileNumber<IUserDoc>(mobileNumber)

    if (existUser) {
      const existCode = await this.otpService.findOneByUser<OtpDoc>({
        type: ENUM_OTP_TYPE.MOBILE,
        user: existUser._id,
      })

      if (!existCode) {
        const generateCode = this.helperNumberService.random(6)
        const otp = await this.otpService.create({
          user: existUser._id,
          code: String(generateCode),
          type: ENUM_OTP_TYPE.MOBILE,
        })

        await this.smsService.sendOtp({ mobile: mobileNumber, otp: otp.code })

        return { data: { userId: existUser._id } }
      }

      const diffDateInMins = this.helperDateService.diff(new Date(), existCode.expiredAt, {
        format: ENUM_HELPER_DATE_DIFF.MINUTES,
      })

      const codeIsNotExpired = diffDateInMins > 0 && diffDateInMins < 5
      if (codeIsNotExpired) {
        throw new ConflictException({
          statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_MOBILE_OTP_EXIST_ERROR,
          message: 'user.error.alreadyCodeGenerated',
        })
      }

      const generateCode = this.helperNumberService.random(6)
      const updateCode = await this.otpService.updateCode(existCode, { code: String(generateCode) })

      // Send Otp Code SMS
      await this.smsService.sendOtp({ mobile: mobileNumber, otp: updateCode.code })

      return { data: { userId: existUser._id } }
    }

    const user: UserDoc = await this.userService.createWithMobile({
      mobileNumber,
      role: role._id,
      signUpFrom: ENUM_USER_SIGN_UP_FROM.PUBLIC,
    })

    const defaultPlan = await this.planService.findDefault()

    if (defaultPlan && user) {
      await this.userPlanService.create({ plan: defaultPlan._id, user: user._id })
    }

    const generateCode = this.helperNumberService.random(6)
    const otp = await this.otpService.create({
      user: user._id,
      code: String(generateCode),
      type: ENUM_OTP_TYPE.MOBILE,
    })

    // Send Otp Code SMS
    return { data: { code: otp.code, userId: user._id } }
  }
}
