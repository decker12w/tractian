import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/cryptography/cryptography.module'
import { DatabaseModule } from '@/database/database.module'
import { StorageModule } from '@/storage/storage.module'
import { AiModule } from '@/ai/ai.module'
import { CreateUserService } from '@/services/create-user.service'
import { CreateUserController } from './controllers/create-user.controller'
import { AuthenticateUserService } from '@/services/authenticate-user.service'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { AnalyzeAudioOrTextService } from '@/services/analyze-audio-or-text.service'
import { AnalyzeAudioOrTextController } from './controllers/analyze-audio-or-text.controller'
import { CreateOrderService } from '@/services/create-order.service'
import { CreateOrderController } from './controllers/create-order.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule, AiModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    AnalyzeAudioOrTextController,
    CreateOrderController,
  ],
  providers: [
    CreateUserService,
    AuthenticateUserService,
    AnalyzeAudioOrTextService,
    CreateOrderService,
  ],
})
export class HttpModule {}
