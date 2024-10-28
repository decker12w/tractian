import { Order, Tool } from '@prisma/client'

export type ToolsRecommenderRequest = {
    order: Order
}

export type ToolsRecommenderResponse = {
    Tools: Tool[]
}

export abstract class ToolsRecommender {
  abstract recommendTools(order: ToolsRecommenderRequest): Promise<ToolsRecommenderResponse>
}
