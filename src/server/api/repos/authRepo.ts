import type { PrismaClient, User, Prisma } from "@prisma/client";

export const authRepo = {
    create: async (
        db: PrismaClient,
        data: Prisma.UserCreateInput
    ): Promise<User> => {
        return db.user.create({ data });
    },
};