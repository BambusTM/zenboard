import type {Board, Prisma, PrismaClient} from "@prisma/client";

export const boardRepo = {
    create: async (
        db: PrismaClient,
        data: Prisma.BoardCreateInput
    ): Promise<Board> => {
        return db.board.create({ data });
    }
}
