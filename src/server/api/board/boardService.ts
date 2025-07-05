import type {CreateBoardType} from "@/lib/schemas/boardSchema";
import type {Board} from "@prisma/client";
import {boardRepo} from "@/server/api/board/boardRepo";
import {createSession} from "@/server/api/session/sessionService";
import type {Context} from "@/server/api/trpc";

export async function createBoard(input: CreateBoardType, ctx: Context): Promise<Board> {
    return await boardRepo.create(ctx.db, {
        name: input.name,
        session: await createSession(ctx),
    })
}
