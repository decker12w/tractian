import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import {
  CreateOrderBodySchema,
  createOrderBodySchema,
} from '@/http/schemas/order-schemas'
import { CreateOrderService } from '@/services/create-order.service'
import { UserPayload } from '@/auth/jwt.strategy'
import { CurrentUser } from '@/auth/current-user.decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)

@Controller('/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() { sub }: UserPayload,
    @Body(bodyValidationPipe)
    {
      title,
      description,
      type,
      machineName,
      technicalId,
    }: CreateOrderBodySchema,
  ) {
    const { order } = await this.createOrderService.execute({
      title,
      description,
      type,
      machineName,
      technicalId,
      plannerId: sub,
    })

    return {
      order,
    }
  }
}
