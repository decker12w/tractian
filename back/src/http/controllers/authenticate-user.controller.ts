import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { AuthenticateUserService } from '@/services/authenticate-user.service'
import {
  AuthenticateUserBodySchema,
  authenticateUserBodySchema,
} from '@/http/schemas/user-schemas'

@Controller('/users/login')
export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
  async handle(@Body() { username, password }: AuthenticateUserBodySchema) {
    const { accessToken } = await this.authenticateUserService.execute({
      username,
      password,
    })

    return {
      accessToken,
    }
  }
}
