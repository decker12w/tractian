import { Injectable } from '@nestjs/common'
import { Planner, Technical } from '@prisma/client'
import { HashGenerator } from '@/cryptography/contracts/contract-hash-generator'
import { ResourceAlreadyExistsError } from '@/services/errors/resource-already-exists-error'
import { TechnicalsRepository } from '@/database/contracts/contract-technicals-repository'
import { PlannersRepository } from '@/database/contracts/contract-planners-repository'

type CreateUserServiceRequest = {
  fullName: string
  username: string
  password: string
  role: 'TECHNICAL' | 'PLANNER'
}

type CreateUserServiceResponse = {
  user: Technical | Planner
}

@Injectable()
export class CreateUserService {
  constructor(
    private technicalsRepository: TechnicalsRepository,
    private plannersRepository: PlannersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    fullName,
    username,
    password,
    role,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const passwordHash = await this.hashGenerator.hash(password)

    if (role === 'TECHNICAL') {
      const technicalWithSameUsernameAlreadyExists =
        await this.technicalsRepository.findByUsername(username)

      if (technicalWithSameUsernameAlreadyExists !== null) {
        throw new ResourceAlreadyExistsError(
          'Técnico',
          'nome de usuário',
          username,
        )
      }

      const createdTechnical = await this.technicalsRepository.create({
        fullName,
        username,
        password: passwordHash,
      })

      return {
        user: createdTechnical,
      }
    }

    const plannerWithSameUsernameAlreadyExists =
      await this.plannersRepository.findByUsername(username)

    if (plannerWithSameUsernameAlreadyExists !== null) {
      throw new ResourceAlreadyExistsError(
        'Planejador',
        'nome de usuário',
        username,
      )
    }

    const createdPlanner = await this.plannersRepository.create({
      fullName,
      username,
      password: passwordHash,
    })

    return {
      user: createdPlanner,
    }
  }
}
