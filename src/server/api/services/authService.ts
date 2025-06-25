import type {User} from "@prisma/client";
import type {Context} from "@/server/api/trpc";
import {authRepo} from "@/server/api/repos/authRepo";
import type {LoginInput, LoginResult, RegisterType} from "@/lib/schemas/authSchema";
import bcrypt from "bcrypt";

export async function registerUser(input: RegisterType, ctx: Context): Promise<User> {
    const hashed = await bcrypt.hash(input.password, 10);

    return await authRepo.create(ctx.db, {
        email: input.email,
        password: hashed,
    });
}

export async function loginUser(input: LoginInput, ctx: Context): Promise<LoginResult> {
    const user = await authRepo.findByEmail(ctx.db, input.email);

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    const isValidPassword = await bcrypt.compare(input.password, user.password);

    if (!isValidPassword) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    const { ...userWithoutPassword } = user;

    return {
        success: true,
        user: userWithoutPassword,
        message: "Login successful"
    };
}
