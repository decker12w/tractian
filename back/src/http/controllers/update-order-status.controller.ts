import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { Param, Controller, Get, HttpCode, Body } from '@nestjs/common'
import {
  UpdateOrderStatusParamSchema,
  updateOrderStatusParamSchema,
  UpdateOrderStatusBodySchema,
  updateOrderStatusBodySchema,
} from '@/http/schemas/order-schemas'
import { UpdateOrderStatusService } from '@/services/update-order-status.service'

const paramValidationPipe = new ZodValidationPipe(updateOrderStatusParamSchema)
const bodyValidationPipe = new ZodValidationPipe(updateOrderStatusBodySchema)

@Controller('/orders/:id/status')
export class UpdateOrderStatusController {
  constructor(private updateOrderStatusService: UpdateOrderStatusService) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe)
    { id }: UpdateOrderStatusParamSchema,
    @Body(bodyValidationPipe)
    { status }: UpdateOrderStatusBodySchema,
  ) {
    const { order } = await this.updateOrderStatusService.execute({
      id,
      status,
    })

    return {
      order,
    }
  }
}
