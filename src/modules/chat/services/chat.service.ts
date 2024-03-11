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
import { UserEntity } from 'src/modules/user/repository/entities/user.entity'

import { ChatCreateDto } from '../dto/chat.create.dto'
import { IChatDoc } from '../interfaces/chat.interface'
import { ChatUpdateDto } from '../dto/chat.update.dto'
import { IChatService } from '../interfaces/chat.service.interface'
import { ChatDoc, ChatEntity } from '../repository/entities/chat.entity'
import { ChatRepository } from '../repository/repositories/chat.repository'
import { HelperDateService } from 'src/common/helper/services/helper.date.service'

@Injectable()
export class ChatService implements IChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly helperDateService: HelperDateService
  ) {}

  async findAll<T = ChatDoc>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]> {
    return this.chatRepository.findAll<T>(find, options)
  }

  async rawFindAll<T = ChatDoc>(find?: PipelineStage[], options?: IDatabaseRawFindAllOptions): Promise<T[]> {
    return this.chatRepository.rawFindAll<T>(find, options)
  }

  async findOneById(_id: string, options?: IDatabaseFindOneOptions): Promise<ChatDoc> {
    return this.chatRepository.findOneById<ChatDoc>(_id, options)
  }

  async findOne(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<ChatDoc> {
    return this.chatRepository.findOne<ChatDoc>(find, options)
  }

  async getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number> {
    return this.chatRepository.getTotal(find, options)
  }

  async create({ user, message }: ChatCreateDto, options?: IDatabaseCreateOptions): Promise<ChatDoc> {
    const create: ChatEntity = new ChatEntity()
    create.user = user

    create.messages = [{ ...message, time: this.helperDateService.create() }]

    return this.chatRepository.create<ChatEntity>(create, options)
  }

  async update(repository: ChatDoc, { message }: ChatUpdateDto, options?: IDatabaseSaveOptions): Promise<ChatDoc> {
    repository.messages.push({ ...message, time: this.helperDateService.create() })

    return this.chatRepository.save(repository, options)
  }

  async delete(repository: ChatDoc, options?: IDatabaseSaveOptions): Promise<ChatDoc> {
    return this.chatRepository.delete(repository, options)
  }

  async deleteMany(find: Record<string, any>, options?: IDatabaseManyOptions): Promise<boolean> {
    return this.chatRepository.deleteMany(find, options)
  }

  async joinWithProperty(repository: ChatDoc): Promise<IChatDoc> {
    return repository.populate([
      {
        path: 'user',
        localField: 'user',
        foreignField: '_id',
        model: UserEntity.name,
        select: ['_id', 'mobileNumber', 'email'],
      },
    ])
  }
}
