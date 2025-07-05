import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import { createSession } from "./sessionService";

export const sessionRouter = createTRPCRouter({
    create: publicProcedure
        .mutation(async ({ ctx }) => {
            return createSession(ctx);
        }),
})
