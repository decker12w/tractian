import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/cryptography/cryptography.module'
import { DatabaseModule } from '@/database/database.module'
import { StorageModule } from '@/storage/storage.module'
import { CreateUserService } from '@/services/create-user.service'
import { CreateUserController } from './controllers/create-user.controller'
import { AuthenticateUserService } from '@/services/authenticate-user.service'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [CreateUserController, AuthenticateUserController],
  providers: [CreateUserService, AuthenticateUserService],
})
export class HttpModule {}
