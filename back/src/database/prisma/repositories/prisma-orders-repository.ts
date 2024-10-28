import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  CreateOrder,
  OrdersRepository,
} from '@/database/contracts/contract-orders-repository'
import { Order } from '@prisma/client'

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateOrder): Promise<Order> {
    return this.prismaService.order.create({ data })
  }

  async findById(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    })
  }

  async findByTechnical(technicalId: string): Promise<Order[]> {
    return this.prismaService.order.findMany({
      where: { technicalId },
      orderBy: { createdAt: 'desc' },
    })
  }
}
