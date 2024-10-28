import { Technical } from '@prisma/client'

type TechnicalPresenterResponse = {
  id: string
  fullName: string
  username: string
}

export class TechnicalPresenter {
  static format(technical: Technical): TechnicalPresenterResponse {
    return {
      id: technical.id,
      fullName: technical.fullName,
      username: technical.username,
    }
  }
}
