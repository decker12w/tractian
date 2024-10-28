import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { Param, Controller, Get, HttpCode, Body } from '@nestjs/common'
import {
  UpdateOrderToolsParamSchema,
  updateOrderToolsParamSchema,
  UpdateOrderToolsBodySchema,
  updateOrderToolsBodySchema,
} from '@/http/schemas/order-schemas'
import { UpdateOrderToolsService } from '@/services/update-order-tools.service'

const paramValidationPipe = new ZodValidationPipe(updateOrderToolsParamSchema)
const bodyValidationPipe = new ZodValidationPipe(updateOrderToolsBodySchema)

@Controller('/orders/:id/status')
export class UpdateOrderToolsController {
  constructor(private updateOrderToolsService: UpdateOrderToolsService) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe)
    { id }: UpdateOrderToolsParamSchema,
    @Body(bodyValidationPipe)
    { toolsIds }: UpdateOrderToolsBodySchema,
  ) {
    const { order } = await this.updateOrderToolsService.execute({
      id,
      toolsIds,
    })

    return {
      order,
    }
  }
}
