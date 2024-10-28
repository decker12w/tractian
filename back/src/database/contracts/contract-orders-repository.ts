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

export type UpdateOrder = {
  id: string
  startedAt: Date | null
  finishedAt: Date | null
}

export type AddTool = {
  id: string
  toolsIds: string[]
}

export abstract class OrdersRepository {
  abstract create: (data: CreateOrder) => Promise<Order>
  abstract update: (data: UpdateOrder) => Promise<Order>
  abstract addTools: (data: AddTool) => Promise<Order>
  abstract findById: (id: string) => Promise<Order | null>
  abstract findByTechnical: (technicalId: string) => Promise<Order[]>
}
