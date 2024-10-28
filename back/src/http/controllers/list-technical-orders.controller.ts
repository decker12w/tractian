import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ListTechnicalOrdersService } from '@/services/list-technical-orders.service'
import { CurrentUser } from '@/auth/current-user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

@Controller('/orders/technical')
@UseGuards(JwtAuthGuard)
export class ListTechnicalOrdersController {
  constructor(private listTechnicalOrdersService: ListTechnicalOrdersService) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() { sub }: UserPayload) {
    const { openOrders, inProgressOrders, finishedOrders } =
      await this.listTechnicalOrdersService.execute({
        technicalId: sub,
      })

    return {
      openOrders,
      inProgressOrders,
      finishedOrders,
    }
  }
}
