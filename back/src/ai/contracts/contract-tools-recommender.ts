import { Order, Tool } from '@prisma/client'

export type ToolsRecommenderRequest = {
  order: Order
  tools: Tool[]
}

export abstract class ToolsRecommender {
  abstract recommendTools(order: ToolsRecommenderRequest): Promise<Tool[]>
}
