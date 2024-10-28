import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TechnicalsRepository } from './contracts/contract-technicals-repository'
import { PrismaTechnicalsRepository } from './prisma/repositories/prisma-technicals-repository'
import { PlannersRepository } from './contracts/contract-planners-repository'
import { PrismaPlannersRepository } from './prisma/repositories/prisma-planners-repository'

@Module({
  providers: [
    PrismaService,
    { provide: TechnicalsRepository, useClass: PrismaTechnicalsRepository },
    { provide: PlannersRepository, useClass: PrismaPlannersRepository },
  ],
  exports: [PrismaService, TechnicalsRepository, PlannersRepository],
})
export class DatabaseModule {}
