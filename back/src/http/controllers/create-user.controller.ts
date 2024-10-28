import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import {
  CreateUserBodySchema,
  createUserBodySchema,
} from '@/http/schemas/user-schemas'
import { CreateUserService } from '@/services/create-user.service'
import { UserPresenter } from '@/http/presenters/user-presenter'

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(
    @Body()
    { fullName, username, password, role }: CreateUserBodySchema,
  ) {
    const { user } = await this.createUserService.execute({
      fullName,
      username,
      password,
      role,
    })

    return {
      user: UserPresenter.format(user),
    }
  }
}
