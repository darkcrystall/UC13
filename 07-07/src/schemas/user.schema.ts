import { z } from "zod";
const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha é muito longa")
    .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter uma letra minúscula")
    .regex(/\d/, "A senha deve conter um número"),
});
export const createUserSchema = userSchema;
export const updateUserSchema = userSchema.partial();
export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;