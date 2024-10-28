import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/cryptography/cryptography.module'
import { DatabaseModule } from '@/database/database.module'
import { StorageModule } from '@/storage/storage.module'
import { CreateTechnicalService } from '@/services/create-technical.service'
import { CreateTechnicalController } from './controllers/create-technical.controller'
import { AuthenticateTechnicalService } from '@/services/authenticate-technical.service'
import { AuthenticateTechnicalController } from './controllers/authenticate-technical.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [CreateTechnicalController, AuthenticateTechnicalController],
  providers: [CreateTechnicalService, AuthenticateTechnicalService],
})
export class HttpModule {}
