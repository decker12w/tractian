import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  AddTool,
  CreateOrder,
  OrdersRepository,
  UpdateOrder,
} from '@/database/contracts/contract-orders-repository'
import { Order } from '@prisma/client'

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateOrder): Promise<Order> {
    return this.prismaService.order.create({ data })
  }

  async update(data: UpdateOrder): Promise<Order> {
    return this.prismaService.order.update({
      where: { id: data.id },
      data,
    })
  }

  async addTools(data: AddTool): Promise<Order> {
    return this.prismaService.order.update({
      where: { id: data.id },
      data: {
        tools: {
          create: data.toolsIds.map((toolId) => ({
            tool: {
              connect: {
                id: toolId,
              },
            },
          })),
        },
      },
      include: { tools: true },
    })
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
