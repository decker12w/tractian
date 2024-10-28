import { Order, OrderType } from '@prisma/client'

export type CreateOrder = {
  title: string
  description: string
  type: OrderType
  machineName: string
  file: string
  plannerId: string
  technicalId: string
}

export abstract class OrdersRepository {
  abstract create: (data: CreateOrder) => Promise<Order>
  abstract findById: (id: string) => Promise<Order | null>
  abstract findByTechnical: (technicalId: string) => Promise<Order[]>
}
