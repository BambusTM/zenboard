import type { PrismaClient, User, Prisma } from "@prisma/client";

export const authRepo = {
    create: async (
        db: PrismaClient,
        data: Prisma.UserCreateInput
    ): Promise<User> => {
        return db.user.create({ data });
    },

    findByEmail: async (
        db: PrismaClient,
        email: string
    ): Promise<User | null> => {
        return db.user.findUnique({
            where: { email }
        });
    },

    findById: async (
        db: PrismaClient,
        id: number
    ): Promise<User | null> => {
        return db.user.findUnique({
            where: { id }
        });
    },

    update: async (
        db: PrismaClient,
        id: number,
        data: Prisma.UserUpdateInput
    ): Promise<User> => {
        return db.user.update({
            where: { id },
            data
        });
    },

    delete: async (
        db: PrismaClient,
        id: number
    ): Promise<User> => {
        return db.user.delete({
            where: { id }
        });
    }
};