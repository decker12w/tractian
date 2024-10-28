import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreatePlanner, PlannerRepository } from '@/database/contracts/contract-planner-repository'
import { Planner } from '@prisma/client'

@Injectable()
export class PrismaPlannerRepository implements PlannerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreatePlanner): Promise<Planner> {
    return this.prismaService.planner.create({ data })
  }

  async findById(id: string): Promise<Planner | null> {
    return this.prismaService.planner.findUnique({
      where: { id },
    })
  }

  async findByUsername(username: string): Promise<Planner | null> {
    return this.prismaService.planner.findUnique({
      where: { username },
    })
  }

  async findAll(): Promise<Planner[]> {
    return this.prismaService.planner.findMany({
      orderBy: {
        fullName: 'asc',
      },
    })
  }
}
