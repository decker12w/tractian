import { ApiError } from './api-error'

export class PdfError extends ApiError {
  constructor() {
    super({
      statusCode: 400,
      message: 'Erro ao gerar PDF.',
    })
  }
}
