import type { CreateBoardType } from "@/lib/schemas/boardSchema";
import type { Board } from "@prisma/client";
import { boardRepo } from "./boardRepo";
import { createSession } from "../session/sessionService";
import type { Context } from "@/server/api/trpc";

export async function createBoard(
    input: CreateBoardType,
    ctx: Context,
    userId: number
): Promise<Board> {

    if (input.createSession) {
        // Create board with session
        const session = await createSession(ctx, userId);

        return await boardRepo.create(ctx.db, {
            name: input.name,
            session: {
                connect: { id: session.id }
            }
        });
    } else {
        return await boardRepo.createPrivate(ctx.db, {
            name: input.name,
            creatorId: userId,
        });
    }
}

export async function publishBoard(
    boardId: number,
    ctx: Context,
    userId: number
): Promise<Board> {
    const board = await boardRepo.findById(ctx.db, boardId);

    if (!board) {
        throw new Error("Board not found");
    }

    // Check if user owns the board (you'll need to implement this logic)
    // if (board.creatorId !== userId) {
    //     throw new Error("Unauthorized");
    // }

    if (board.sessionId) {
        throw new Error("Board already has a session");
    }

    const session = await createSession(ctx, userId);

    return await boardRepo.update(ctx.db, boardId, {
        session: {
            connect: { id: session.id }
        }
    });
}
