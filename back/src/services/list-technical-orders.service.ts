import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { OrdersRepository } from '@/database/contracts/contract-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { TechnicalsRepository } from '@/database/contracts/contract-technicals-repository'

type ListTechnicalOrdersServiceRequest = {
  technicalId: string
}

type ListTechnicalOrdersServiceResponse = {
  openOrders: Order[]
  inProgressOrders: Order[]
  finishedOrders: Order[]
}

@Injectable()
export class ListTechnicalOrdersService {
  constructor(
    private technicalsRepository: TechnicalsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    technicalId,
  }: ListTechnicalOrdersServiceRequest): Promise<ListTechnicalOrdersServiceResponse> {
    const technical = await this.technicalsRepository.findById(technicalId)
    if (technical === null) {
      throw new ResourceNotFoundError('Técnico', 'id', technicalId)
    }

    const orders = await this.ordersRepository.findByTechnical(technicalId)

    return {
      openOrders: orders.filter(
        (order) => order.startedAt === null && order.finishedAt === null,
      ),
      inProgressOrders: orders.filter(
        (order) => order.startedAt !== null && order.finishedAt === null,
      ),
      finishedOrders: orders.filter(
        (order) => order.startedAt !== null && order.finishedAt !== null,
      ),
    }
  }
}
