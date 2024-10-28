import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Tool } from '@prisma/client'
import { ToolsRepository } from '@/database/contracts/contract-tools-repository'

@Injectable()
export class PrismaToolsRepository implements ToolsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Tool | null> {
    return this.prismaService.tool.findUnique({
      where: { id },
    })
  }

  async findAll(): Promise<Tool[]> {
    return this.prismaService.tool.findMany({
      orderBy: {
        category: 'asc',
      },
    })
  }
}
