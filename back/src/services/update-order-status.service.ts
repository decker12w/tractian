import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { OrdersRepository } from '@/database/contracts/contract-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrderNotStartedError } from './errors/order-not-started-error'
import { OrderAlreadyFinishedError } from './errors/order-already-finished-error'

type UpdateOrderStatusServiceRequest = {
  id: string
  status: 'STARTED' | 'FINISHED'
}

type UpdateOrderStatusServiceResponse = {
  order: Order
}

@Injectable()
export class UpdateOrderStatusService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    status,
  }: UpdateOrderStatusServiceRequest): Promise<UpdateOrderStatusServiceResponse> {
    const order = await this.ordersRepository.findById(id)
    if (order === null) {
      throw new ResourceNotFoundError('Ordem', 'id', id)
    }

    if (status === 'FINISHED' && order.startedAt === null) {
      throw new OrderNotStartedError()
    }

    if (status === 'STARTED' && order.finishedAt !== null) {
      throw new OrderAlreadyFinishedError()
    }

    if (status === 'STARTED') {
      order.startedAt = new Date()
    } else {
      order.finishedAt = new Date()
    }

    const updatedOrder = await this.ordersRepository.update({
      id,
      startedAt: order.startedAt,
      finishedAt: order.finishedAt,
    })

    return {
      order: updatedOrder,
    }
  }
}
