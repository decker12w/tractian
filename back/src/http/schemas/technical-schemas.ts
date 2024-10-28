import { z } from 'zod'

const createTechnicalBodySchema = z.object({
  fullName: z.string().min(1, { message: 'O nome completo é obrigatório.' }),
  username: z
    .string()
    .min(6, { message: 'O nome de usuário deve ter pelo menos 6 caracteres.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
})

const authenticateTechnicalBodySchema = z.object({
  username: z.string().min(1, { message: 'O nome de usuário é obrigatório.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
})

type CreateTechnicalBodySchema = z.infer<typeof createTechnicalBodySchema>
type AuthenticateTechnicalBodySchema = z.infer<
  typeof authenticateTechnicalBodySchema
>

export {
  createTechnicalBodySchema,
  authenticateTechnicalBodySchema,
  CreateTechnicalBodySchema,
  AuthenticateTechnicalBodySchema,
}
