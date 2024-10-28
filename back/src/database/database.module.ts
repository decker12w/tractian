import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TechnicalsRepository } from './contracts/contract-technicals-repository'
import { PrismaTechnicalsRepository } from './prisma/repositories/prisma-technicals-repository'
import { PlannerPresenter } from '@/http/presenters/planner-presenter'
import { PlannerRepository } from './contracts/contract-planner-repository'
import { PrismaPlannerRepository } from './prisma/repositories/prisma-planner-repository'

@Module({
  providers: [
    PrismaService,
    { provide: TechnicalsRepository, useClass: PrismaTechnicalsRepository },
    { provide: PlannerRepository, useClass: PrismaPlannerRepository },
  ],
  exports: [PrismaService, TechnicalsRepository],
})
export class DatabaseModule { }
