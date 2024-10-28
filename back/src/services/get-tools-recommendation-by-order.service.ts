import { Injectable } from '@nestjs/common'
import { ToolsRecommender } from '@/ai/contracts/contract-tools-recommender'
import { Tool } from '@prisma/client'
import { OrdersRepository } from '@/database/contracts/contract-orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ToolsRepository } from '@/database/contracts/contract-tools-repository'

type GetToolsRecommendationByOrderServiceRequest = {
  orderId: string
}

type GetToolsRecommendationByOrderServiceResponse = {
  toolsRecommended: Tool[]
}

@Injectable()
export class GetToolsRecommendationByOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private toolsRepository: ToolsRepository,
    private toolsRecommender: ToolsRecommender,
  ) {}

  async execute({
    orderId,
  }: GetToolsRecommendationByOrderServiceRequest): Promise<GetToolsRecommendationByOrderServiceResponse> {
    const order = await this.ordersRepository.findById(orderId)
    if (order === null) {
      throw new ResourceNotFoundError('Ordem', 'id', orderId)
    }

    const tools = await this.toolsRepository.findAll()

    const toolsRecommended = await this.toolsRecommender.recommendTools({
      order,
      tools,
    })

    return {
      toolsRecommended,
    }
  }
}
