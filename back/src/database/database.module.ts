import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TechnicalsRepository } from './contracts/contract-technicals-repository'
import { PrismaTechnicalsRepository } from './prisma/repositories/prisma-technicals-repository'
import { PlannersRepository } from './contracts/contract-planners-repository'
import { PrismaPlannersRepository } from './prisma/repositories/prisma-planners-repository'
import { ToolsRepository } from './contracts/contract-tools-repository'
import { PrismaToolsRepository } from './prisma/repositories/prisma-tools-repository'
import { OrdersRepository } from './contracts/contract-orders-repository'
import { PrismaOrdersRepository } from './prisma/repositories/prisma-orders-repository'

@Module({
  providers: [
    PrismaService,
    { provide: TechnicalsRepository, useClass: PrismaTechnicalsRepository },
    { provide: PlannersRepository, useClass: PrismaPlannersRepository },
    { provide: ToolsRepository, useClass: PrismaToolsRepository },
    { provide: OrdersRepository, useClass: PrismaOrdersRepository },
  ],
  exports: [
    PrismaService,
    TechnicalsRepository,
    PlannersRepository,
    ToolsRepository,
    OrdersRepository,
  ],
})
export class DatabaseModule {}
