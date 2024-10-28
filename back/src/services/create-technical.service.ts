import { Injectable } from '@nestjs/common'
import { Technical } from '@prisma/client'
import { HashGenerator } from '@/cryptography/contracts/contract-hash-generator'
import { ResourceAlreadyExistsError } from '@/services/errors/resource-already-exists-error'
import { TechnicalsRepository } from '@/database/contracts/contract-technicals-repository'

type CreateTechnicalServiceRequest = {
  fullName: string
  username: string
  password: string
}

type CreateTechnicalServiceResponse = {
  technical: Technical
}

@Injectable()
export class CreateTechnicalService {
  constructor(
    private technicalsRepository: TechnicalsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    fullName,
    username,
    password,
  }: CreateTechnicalServiceRequest): Promise<CreateTechnicalServiceResponse> {
    const TechnicalWithSameUsernameAlreadyExists =
      await this.technicalsRepository.findByUsername(username)
    if (TechnicalWithSameUsernameAlreadyExists !== null) {
      throw new ResourceAlreadyExistsError(
        'Técnico',
        'nome de usuário',
        username,
      )
    }

    const passwordHash = await this.hashGenerator.hash(password)
    const createdTechnical = await this.technicalsRepository.create({
      fullName,
      username,
      password: passwordHash,
    })

    return {
      technical: createdTechnical,
    }
  }
}
