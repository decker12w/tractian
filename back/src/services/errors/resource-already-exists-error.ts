import { ApiError } from './api-error'

export class ResourceAlreadyExistsError extends ApiError {
  constructor(resource: string, key?: string, value?: string) {
    super({
      statusCode: 409,
      message: `${resource[0].toUpperCase() + resource.slice(1)} ${key !== undefined && value !== undefined && `com ${key} ${value}`} já existe.`,
    })
  }
}
