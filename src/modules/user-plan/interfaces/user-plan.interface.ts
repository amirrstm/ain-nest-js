import { UserPlanDoc, UserPlanEntity } from '../repository/entities/user-plan.entity'
import { IUserDoc, IUserEntity } from 'src/modules/user/interfaces/user.interface'
import { PlanDoc, PlanEntity } from 'src/modules/plan/repository/entities/plan.entity'

export interface IUserPlanEntity extends Omit<UserPlanEntity, 'plan' | 'user'> {
  user: IUserEntity
  plan: PlanEntity
}

export interface IUserPlanDoc extends Omit<UserPlanDoc, 'plan' | 'user'> {
  user: IUserDoc
  plan: PlanDoc
}
