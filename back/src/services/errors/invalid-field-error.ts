import { ApiError } from './api-error'

export class InvalidFieldError extends ApiError {
  constructor(field: string) {
    super({
      statusCode: 400,
      message: `${field} inválido.`,
    })
  }
}
