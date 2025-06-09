import { z } from "zod";
import type {User} from "@prisma/client";

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export type LoginInput = {
    email: string;
    password: string;
};

export type LoginResult = {
    success: boolean;
    user?: Omit<User, 'password'>;
    message: string;
};
