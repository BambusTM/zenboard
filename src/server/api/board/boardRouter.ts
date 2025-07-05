import {createTRPCRouter, protectedProcedure, publicProcedure} from "@/server/api/trpc";
import { createBoard, publishBoard } from "@/server/api/board/boardService";
import { CreateBoardSchema } from "@/lib/schemas/boardSchema";
import { z } from "zod";
import {boardRepo, type BoardWithSession} from "./boardRepo";

export const boardRouter = createTRPCRouter({
    create: publicProcedure
        .input(CreateBoardSchema)
        .mutation(async ({ input, ctx }): Promise<BoardWithSession> => {
            if (!ctx.session?.user?.id) {
                throw new Error("Unauthorized");
            }
            return await createBoard(input, ctx, ctx.session.user.id);
        }),

  publish: protectedProcedure
    .input(z.object({ boardId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return publishBoard(input.boardId, ctx, ctx.session.user.id);
    }),

  getMyBoards: protectedProcedure.query(async ({ ctx }) => {
    return boardRepo.findByUserId(ctx.db, ctx.session.user.id);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return boardRepo.findById(ctx.db, input.id);
    }),
});
