import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterType = z.infer<typeof RegisterSchema>;