import { Planner } from '@prisma/client'

type PlannerPresenterResponse = {
  id: string
  fullName: string
  username: string
}

export class PlannerPresenter {
  static format(planner: Planner): PlannerPresenterResponse {
    return {
      id: planner.id,
      fullName: planner.fullName,
      username: planner.username,
    }
  }
}
