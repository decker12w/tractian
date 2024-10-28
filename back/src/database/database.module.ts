import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TechnicalsRepository } from './contracts/contract-technicals-repository'
import { PrismaTechnicalsRepository } from './prisma/repositories/prisma-technicals-repository'

@Module({
  providers: [
    PrismaService,
    { provide: TechnicalsRepository, useClass: PrismaTechnicalsRepository },
  ],
  exports: [PrismaService, TechnicalsRepository],
})
export class DatabaseModule {}
