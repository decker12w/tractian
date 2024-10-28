import { ApiError } from './api-error'

export class InvalidCredentialsError extends ApiError {
  constructor() {
    super({
      statusCode: 401,
      message: 'Credenciais inválidas.',
    })
  }
}
