// src/utils/schemas/auth.ts

import { z } from "zod";
import { Roles } from "../types";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(6, "O nome de usuário deve ter pelo menos 6 caracteres."),
  fullName: z.string().min(1, "O nome completo é obrigatório."), // Alinhado com backend
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  role: z.nativeEnum(Roles, {
    errorMap: () => ({ message: "Selecione uma role válida." }),
  }),
});

export const LoginSchema = z.object({
  username: z.string().min(1, "O nome de usuário é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
export type RegisterDTO = z.infer<typeof RegisterSchema>;
