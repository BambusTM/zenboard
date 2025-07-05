import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {BoardSchema} from "@/lib/schemas/boardSchema";
import {createBoard} from "@/server/api/board/boardService";

export const boardRouter = createTRPCRouter({
    create: publicProcedure
        .input(BoardSchema)
        .mutation(async ({ input, ctx }) => {
            return createBoard(input, ctx);
        }),
})
