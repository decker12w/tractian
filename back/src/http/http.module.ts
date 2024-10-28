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

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule, AiModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    AnalyzeAudioOrTextController,
  ],
  providers: [
    CreateUserService,
    AuthenticateUserService,
    AnalyzeAudioOrTextService,
  ],
})
export class HttpModule {}
