import { Injectable } from '@nestjs/common'
import { TechnicalsRepository } from '@/database/contracts/contract-technicals-repository'
import { Encrypter } from '@/cryptography/contracts/contract-encrypter'
import { HashComparer } from '@/cryptography/contracts/contract-hash-comparer'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

type AuthenticateTechnicalServiceRequest = {
  username: string
  password: string
}

type AuthenticateTechnicalServiceResponse = {
  accessToken: string
}

@Injectable()
export class AuthenticateTechnicalService {
  constructor(
    private technicalsRepository: TechnicalsRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    username,
    password,
  }: AuthenticateTechnicalServiceRequest): Promise<AuthenticateTechnicalServiceResponse> {
    const technical = await this.technicalsRepository.findByUsername(username)
    if (technical === null) {
      throw new InvalidCredentialsError()
    }

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
}
