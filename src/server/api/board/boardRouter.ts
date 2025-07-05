import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {createBoard} from "@/server/api/board/boardService";
import { CreateBoardSchema } from "@/lib/schemas/boardSchema";
import { z } from "zod";

export const boardRouter = createTRPCRouter({
    create: publicProcedure
        .input(CreateBoardSchema)
        .mutation(async ({ input, ctx }) => {
            return createBoard(input, ctx, ctx.session.user.id);
        }),

    publish: publicProcedure
        .input(z.object({ boardId: z.number() }))
        .mutation(async ({ input, ctx }) => {
            return publishBoard(input.boardId, ctx, ctx.session.user.id);
        }),

    getMyBoards: publicProcedure
        .query(async ({ ctx }) => {
            return boardRepo.findByUserId(ctx.db, ctx.session.user.id);
        }),

    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            return boardRepo.findById(ctx.db, input.id);
        }),
});
