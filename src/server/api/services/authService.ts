import type {User} from "@prisma/client";
import type {Context} from "@/server/api/trpc";
import {authRepo} from "@/server/api/repos/authRepo";
import type { RegisterType } from "@/lib/schemas/user";
import bcrypt from "bcrypt";

export async function registerUser(input: RegisterType, ctx: Context): Promise<User> {
    const hashed = await bcrypt.hash(input.password, 10);

    return await authRepo.create(ctx.db, {
        email: input.email,
        password: hashed,
    });
}
