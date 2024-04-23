import { PipelineStage } from 'mongoose'
import { Injectable } from '@nestjs/common'
import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseGetTotalOptions,
  IDatabaseManyOptions,
  IDatabaseSaveOptions,
  IDatabaseRawFindAllOptions,
} from 'src/common/database/interfaces/database.interface'
import { HelperDateService } from 'src/common/helper/services/helper.date.service'

import { UserPlanCreateDto } from '../dto/user-plan.create.dto'
import { UserPlanUpdateDto } from '../dto/user-plan.update.dto'
import { IUserPlanService } from '../interfaces/user-plan.service.interface'
import { UserPlanRepository } from '../repository/repositories/user-plan.repository'
import { UserPlanDoc, UserPlanEntity } from '../repository/entities/user-plan.entity'
import { APP_LANGUAGE } from 'src/app/constants/app.constant'

@Injectable()
export class UserPlanService implements IUserPlanService {
  constructor(
    private readonly userPlanRepo: UserPlanRepository,
    private readonly helperDateService: HelperDateService
  ) {}

  async findAll<T = UserPlanDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.userPlanRepo.findAll<T>(find, options)
  }

  async rawFindAll<T = UserPlanDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.userPlanRepo.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<UserPlanDoc> {
    return this.userPlanRepo.findOneById<UserPlanDoc>(_id, options)
  }

  async findAllExpired(options?: IDatabaseFindAllOptions): Promise<UserPlanDoc[]> {
    return this.userPlanRepo.findAll<UserPlanDoc>({ planExpired: { $lte: new Date() } }, options)
  }

  async findAllWithTranslation<T = UserPlanDoc>(
    language?: string,
    find?: Record<string, any>,
    options?: IDatabaseRawFindAllOptions
  ): Promise<T[]> {
    const defaultLanguage = APP_LANGUAGE
    const nonTranslatedFields = {
      _id: 1,
      name: 1,
      used: 1,
      createdAt: 1,
      description: 1,
      planExpired: 1,
      'plan.name': 1,
      'plan.slug': 1,
      'plan.generation': 1,
      'plan.description': 1,
    }
    return this.userPlanRepo.rawFindAll(
      [
        {
          $match: find,
        },
        {
          $lookup: {
            from: 'plans',
            localField: 'plan',
            foreignField: '_id',
            as: 'plan',
          },
        },
        { $unwind: '$plan' },
        {
          $addFields: {
            'plan.name': { $ifNull: [`$plan.name.${language}`, `$plan.name.${defaultLanguage}`] },
            'plan.description': { $ifNull: [`$plan.description.${language}`, `$plan.description.${defaultLanguage}`] },
          },
        },
        {
          $project: {
            ...nonTranslatedFields,
            name: { $ifNull: [`$name.${language}`, `$name.${defaultLanguage}`] },
            description: { $ifNull: [`$description.${language}`, `$description.${defaultLanguage}`] },
          },
        },
      ],
      options
    )
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<UserPlanDoc> {
    return this.userPlanRepo.findOne<UserPlanDoc>(find, options)
  }

  async findOneByUserId(_id: string, options?: IDatabaseFindOneOptions): Promise<UserPlanDoc> {
    return this.userPlanRepo.findOne<UserPlanDoc>({ user: _id }, options)
  }

  async findOneByName(name: string, options?: IDatabaseFindOneOptions): Promise<UserPlanDoc> {
    return this.userPlanRepo.findOne<UserPlanDoc>({ name }, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.userPlanRepo.getTotal(find, options)
  }

  async create({ plan, user }: UserPlanCreateDto, options?: IDatabaseCreateOptions): Promise<UserPlanDoc> {
    const create: UserPlanEntity = new UserPlanEntity()

    create.used = 0
    create.plan = plan
    create.user = user
    create.planExpired = this.helperDateService.forwardInDays(30)

    return this.userPlanRepo.create<UserPlanEntity>(create, options)
  }

  async update(
    repository: UserPlanDoc,
    { used }: UserPlanUpdateDto,
    options?: IDatabaseSaveOptions
  ): Promise<UserPlanDoc> {
    repository.used = used

    return this.userPlanRepo.save(repository, options)
  }

  async updateExpire(repository: UserPlanDoc, options?: IDatabaseSaveOptions): Promise<UserPlanDoc> {
    repository.used = 0
    repository.planExpired = this.helperDateService.forwardInDays(30)

    return this.userPlanRepo.save(repository, options)
  }

  async delete(repository: UserPlanDoc, options?: IDatabaseSaveOptions): Promise<UserPlanDoc> {
    return this.userPlanRepo.softDelete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.userPlanRepo.deleteMany(find, options)
  }
}
