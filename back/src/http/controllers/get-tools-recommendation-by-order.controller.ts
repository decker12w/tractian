import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { Param, Controller, Get, HttpCode } from '@nestjs/common'
import {
  GetToolsRecommendationByOrderParamSchema,
  getToolsRecommendationByOrderParamSchema,
} from '@/http/schemas/order-schemas'
import { GetToolsRecommendationByOrderService } from '@/services/get-tools-recommendation-by-order.service'

const paramValidationPipe = new ZodValidationPipe(
  getToolsRecommendationByOrderParamSchema,
)

@Controller('/orders/:orderId/tools/recommendation')
export class GetToolsRecommendationByOrderController {
  constructor(
    private getToolsRecommendationByOrderService: GetToolsRecommendationByOrderService,
  ) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe)
    { orderId }: GetToolsRecommendationByOrderParamSchema,
  ) {
    const { toolsRecommended } =
      await this.getToolsRecommendationByOrderService.execute({
        orderId,
      })

    return {
      toolsRecommended,
    }
  }
}
