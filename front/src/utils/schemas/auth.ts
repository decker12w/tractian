import { z } from "zod";
import { Roles } from "../types";

const RegisterSchema = z.object({
  username: z.string().min(1, "Campo obrigatório"),
  fullname: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
  role: z.nativeEnum(Roles),
});

const LoginSchema = z.object({
  username: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
});

type LoginDTO = z.infer<typeof LoginSchema>;
type RegisterDTO = z.infer<typeof RegisterSchema>;

export { LoginSchema, type LoginDTO, RegisterSchema, type RegisterDTO };
