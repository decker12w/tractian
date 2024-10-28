import { ApiError } from './api-error'

export class OrderAlreadyFinishedError extends ApiError {
  constructor() {
    super({
      statusCode: 400,
      message: 'A ordem já foi finalizada.',
    })
  }
}
