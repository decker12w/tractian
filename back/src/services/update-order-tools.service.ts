import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { OrdersRepository } from '@/database/contracts/contract-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type UpdateOrderToolsServiceRequest = {
  id: string
  toolsIds: string[]
}

type UpdateOrderToolsServiceResponse = {
  order: Order
}

@Injectable()
export class UpdateOrderToolsService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    toolsIds,
  }: UpdateOrderToolsServiceRequest): Promise<UpdateOrderToolsServiceResponse> {
    const order = await this.ordersRepository.findById(id)
    if (order === null) {
      throw new ResourceNotFoundError('Ordem', 'id', id)
    }

    const updatedOrder = await this.ordersRepository.addTools({ id, toolsIds })

    return {
      order: updatedOrder,
    }
  }
}
