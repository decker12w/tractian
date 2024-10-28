import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { AuthenticateTechnicalService } from '@/services/authenticate-user.service'
import {
  AuthenticateTechnicalBodySchema,
  authenticateTechnicalBodySchema,
} from '@/http/schemas/user-schemas'

@Controller('/technicals/login')
export class AuthenticateTechnicalController {
  constructor(
    private authenticateTechnicalService: AuthenticateTechnicalService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateTechnicalBodySchema))
  async handle(
    @Body() { username, password }: AuthenticateTechnicalBodySchema,
  ) {
    const { accessToken } = await this.authenticateTechnicalService.execute({
      username,
      password,
    })

    return {
      accessToken,
    }
  }
}
