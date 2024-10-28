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
import { GetToolsRecommendationByOrderService } from '@/services/get-tools-recommendation-by-order.service'
import { GetToolsRecommendationByOrderController } from './controllers/get-tools-recommendation-by-order.controller'
import { UpdateOrderStatusService } from '@/services/update-order-status.service'
import { UpdateOrderStatusController } from './controllers/update-order-status.controller'
import { UpdateOrderToolsService } from '@/services/update-order-tools.service'
import { UpdateOrderToolsController } from './controllers/update-order-tools.controller'
import { ListTechnicalOrdersService } from '@/services/list-technical-orders.service'
import { ListTechnicalOrdersController } from './controllers/list-technical-orders.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule, AiModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    AnalyzeAudioOrTextController,
    CreateOrderController,
    GetToolsRecommendationByOrderController,
    UpdateOrderStatusController,
    UpdateOrderToolsController,
    ListTechnicalOrdersController,
  ],
  providers: [
    CreateUserService,
    AuthenticateUserService,
    AnalyzeAudioOrTextService,
    CreateOrderService,
    GetToolsRecommendationByOrderService,
    UpdateOrderStatusService,
    UpdateOrderToolsService,
    ListTechnicalOrdersService,
  ],
})
export class HttpModule {}
