import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Planner, Tool } from '@prisma/client'
import { ToolsRepository } from '@/database/contracts/contract-tools-repository'

@Injectable()
export class PrismaToolsRepository implements ToolsRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Tool[]> {
    return this.prismaService.tool.findMany({
      orderBy: {
        category: 'asc',
      },
    })
  }
}
