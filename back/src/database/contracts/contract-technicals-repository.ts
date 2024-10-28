import { Technical } from '@prisma/client'

export type CreateTechnical = {
  fullName: string
  username: string
  password: string
}

export abstract class TechnicalsRepository {
  abstract create: (data: CreateTechnical) => Promise<Technical>
  abstract findById: (id: string) => Promise<Technical | null>
  abstract findByUsername: (username: string) => Promise<Technical | null>

  abstract findAll: () => Promise<Technical[]>
}
