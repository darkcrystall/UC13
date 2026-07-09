import { z } from "zod";
export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha é muito longa")
    .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter uma letra minúscula")
    .regex(/\d/, "A senha deve conter um número"),
});
export const updateUserSchema = createUserSchema.partial();