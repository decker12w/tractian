import { Planner } from '@prisma/client'

export type CreatePlanner = {
  fullName: string
  username: string
  password: string
}

export abstract class PlannerRepository {
  abstract create: (data: CreatePlanner) => Promise<Planner>
  abstract findById: (id: string) => Promise<Planner | null>
  abstract findByUsername: (username: string) => Promise<Planner | null>

  abstract findAll: () => Promise<Planner[]>
}
