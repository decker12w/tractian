import { Technical, Planner } from '@prisma/client'

type UserPresenterResponse = {
  id: string
  fullName: string
  username: string
}

export class UserPresenter {
  static format(user: Technical | Planner): UserPresenterResponse {
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
    }
  }
}
