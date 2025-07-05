import type {Prisma, PrismaClient, Session} from "@prisma/client";

export const sessionRepo = {
    create: async (
        db: PrismaClient,
        data: Prisma.SessionCreateInput
    ): Promise<Session> => {
        return db.session.create({
            data,
            include: {
                participants: true,
                board: true,
            }
        });
    },

    findByJoinCode: async (
        db: PrismaClient,
        joinCode: string
    ): Promise<Session | null> => {
        return db.session.findUnique({
            where: { joinCode },
            include: {
                participants: true,
                board: true,
            }
        });
    },

    findById: async (
        db: PrismaClient,
        id: number
    ): Promise<Session | null> => {
        return db.session.findUnique({
            where: { id },
            include: {
                participants: true,
                board: true,
            }
        });
    },

    addParticipant: async (
        db: PrismaClient,
        sessionId: number,
        userId: number
    ) => {
        return db.sessionUser.create({
            data: {
                sessionId,
                userId,
            }
        });
    }
};
