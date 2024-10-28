import { Order, Technical } from '@prisma/client'

export type TechnicalRecommenderRequest = {
  orders: Order[]
  technicals: Technical[]
}

export abstract class TechnicalRecommender {
  abstract recommendTechnical(
    data: TechnicalRecommenderRequest,
  ): Promise<string>
}
