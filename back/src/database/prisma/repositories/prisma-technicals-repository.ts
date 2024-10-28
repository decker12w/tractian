import { Technical } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import {
  TechnicalsRepository,
  CreateTechnical,
} from '@/database/contracts/contract-technicals-repository'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTechnicalsRepository implements TechnicalsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateTechnical): Promise<Technical> {
    return this.prismaService.technical.create({ data })
  }

  async findById(id: string): Promise<Technical | null> {
    return this.prismaService.technical.findUnique({
      where: { id },
    })
  }

  async findByUsername(username: string): Promise<Technical | null> {
    return this.prismaService.technical.findUnique({
      where: { username },
    })
  }

  async findAll(): Promise<Technical[]> {
    return this.prismaService.technical.findMany({
      orderBy: {
        fullName: 'asc',
      },
    })
  }
}
