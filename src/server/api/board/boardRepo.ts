import type {Board, Prisma, PrismaClient, Session, SessionUser} from "@prisma/client";

export type BoardWithSession = Board & {
    session: (Session & {
        participants: SessionUser[];
    }) | null;
};

export const boardRepo = {
    create: async (
        db: PrismaClient,
        data: Prisma.BoardCreateInput
    ): Promise<BoardWithSession> => {
        return db.board.create({
            data,
            include: {
                session: {
                    include: {
                        participants: true,
                    }
                }
            }
        });
    },

    createPrivate: async (
        db: PrismaClient,
        data: Prisma.BoardCreateInput
    ): Promise<Board> => {
        return db.board.create({
            data,
            include: {
                stickies: true,
            }
        });
    },

    findById: async (
        db: PrismaClient,
        id: number
    ): Promise<Board | null> => {
        return db.board.findUnique({
            where: { id },
            include: {
                session: {
                    include: {
                        participants: true,
                    }
                },
                stickies: true,
            }
        });
    },

    update: async (
        db: PrismaClient,
        id: number,
        data: Prisma.BoardUpdateInput
    ): Promise<Board> => {
        return db.board.update({
            where: { id },
            data,
            include: {
                session: {
                    include: {
                        participants: true,
                    }
                }
            }
        });
    },

    findByUserId: async (
        db: PrismaClient,
        userId: number
    ): Promise<Board[]> => {
        return db.board.findMany({
            where: {
                OR: [
                    {
                        creatorId: userId,
                    },
                    {
                        session: {
                            participants: {
                                some: { userId }
                            }
                        }
                    }
                ]
            },
            include: {
                session: {
                    include: {
                        participants: true,
                    }
                }
            }
        });
    }
};
