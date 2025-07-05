import type {Prisma, PrismaClient, Session} from "@prisma/client";

export const sessionRepo = {
    create: async (
        db: PrismaClient,
        data: Prisma.SessionCreateInput
    ): Promise<Session> => {
        return db.session.create({data})
    }
}
