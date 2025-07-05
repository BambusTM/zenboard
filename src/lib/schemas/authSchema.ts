import {z} from "zod";
import type {User} from "@prisma/client";

// Server-side schemas (for tRPC)
export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// Client-side schemas (with better validation messages)
export const RegisterFormSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const LoginFormSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Types
export type RegisterType = z.infer<typeof RegisterSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type LoginFormType = z.infer<typeof LoginFormSchema>;

export type LoginInput = {
    email: string;
    password: string;
};

export type LoginResult = {
    success: boolean;
    user?: Omit<User, 'password'>;
    message: string;
};
