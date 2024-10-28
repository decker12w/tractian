import { z } from 'zod'

const createUserBodySchema = z.object({
  fullName: z.string().min(1, { message: 'O nome completo é obrigatório.' }),
  username: z
    .string()
    .min(6, { message: 'O nome de usuário deve ter pelo menos 6 caracteres.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  role: z.enum(['TECHNICAL', 'PLANNER']),
})

const authenticateUserBodySchema = z.object({
  username: z.string().min(1, { message: 'O nome de usuário é obrigatório.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>
type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>

export {
  createUserBodySchema,
  authenticateUserBodySchema,
  CreateUserBodySchema,
  AuthenticateUserBodySchema,
}
