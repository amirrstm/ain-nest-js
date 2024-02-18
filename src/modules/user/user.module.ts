import { Module } from '@nestjs/common'
import { UserRepositoryModule } from 'src/modules/user/repository/user.repository.module'

import { UserService } from './services/user.service'

@Module({
  controllers: [],
  exports: [UserService],
  providers: [UserService],
  imports: [UserRepositoryModule],
})
export class UserModule {}
