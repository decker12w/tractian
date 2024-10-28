import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/cryptography/cryptography.module'
import { DatabaseModule } from '@/database/database.module'
import { StorageModule } from '@/storage/storage.module'
import { CreateTechnicalService } from '@/services/create-user.service'
import { CreateTechnicalController } from './controllers/create-user.controller'
import { AuthenticateTechnicalService } from '@/services/authenticate-user.service'
import { AuthenticateTechnicalController } from './controllers/authenticate-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [CreateTechnicalController, AuthenticateTechnicalController],
  providers: [CreateTechnicalService, AuthenticateTechnicalService],
})
export class HttpModule {}
