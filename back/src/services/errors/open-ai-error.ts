import { ApiError } from './api-error'

export class OpenAIError extends ApiError {
  constructor() {
    super({
      statusCode: 400,
      message: 'Erro ao se comunicar com a Open AI.',
    })
  }
}
