import { ApiError } from './api-error'

export class OrderNotStartedError extends ApiError {
  constructor() {
    super({
      statusCode: 400,
      message: 'A ordem ainda não foi iniciada.',
    })
  }
}
