import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import {
  CreateTechnicalBodySchema,
  createTechnicalBodySchema,
} from '@/http/schemas/user-schemas'
import { CreateTechnicalService } from '@/services/create-user.service'
import { TechnicalPresenter } from '@/http/presenters/technical-presenter'

@Controller('/technicals')
export class CreateTechnicalController {
  constructor(private createTechnicalService: CreateTechnicalService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createTechnicalBodySchema))
  async handle(
    @Body()
    { fullName, username, password }: CreateTechnicalBodySchema,
  ) {
    const { technical } = await this.createTechnicalService.execute({
      fullName,
      username,
      password,
    })

    return {
      technical: TechnicalPresenter.format(technical),
    }
  }
}
