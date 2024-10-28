import { Injectable } from '@nestjs/common'
import { TechnicalsRepository } from '@/database/contracts/contract-technicals-repository'
import { Encrypter } from '@/cryptography/contracts/contract-encrypter'
import { HashComparer } from '@/cryptography/contracts/contract-hash-comparer'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { PlannersRepository } from '@/database/contracts/contract-planners-repository'

type AuthenticateUserServiceRequest = {
  username: string
  password: string
}

type AuthenticateUserServiceResponse = {
  accessToken: string
}

@Injectable()
export class AuthenticateUserService {
  constructor(
    private technicalsRepository: TechnicalsRepository,
    private plannersRepository: PlannersRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    username,
    password,
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const technical = await this.technicalsRepository.findByUsername(username)
    const planner = await this.plannersRepository.findByUsername(username)
    if (planner === null && technical === null) {
      throw new InvalidCredentialsError()
    }

    if (planner === null && technical !== null) {
      const samePasswords = await this.hashComparer.compare(
        password,
        technical.password,
      )

      if (!samePasswords) {
        throw new InvalidCredentialsError()
      }

      const accessToken = await this.encrypter.encrypt({ sub: technical.id })
      return {
        accessToken,
      }
    }

    const samePasswords = await this.hashComparer.compare(
      password,
      planner!.password,
    )
    if (!samePasswords) {
      throw new InvalidCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({ sub: planner!.id })
    return {
      accessToken,
    }
  }
}
