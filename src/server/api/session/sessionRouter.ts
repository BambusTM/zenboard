import {createTRPCRouter, protectedProcedure} from "@/server/api/trpc";
import { z } from "zod";
import { joinSession } from "./sessionService";
import { sessionRepo } from "./sessionRepo";
import { TRPCError } from "@trpc/server";

export const sessionRouter = createTRPCRouter({
  join: protectedProcedure
    .input(z.object({ joinCode: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return joinSession(ctx, input.joinCode, ctx.session.user.id);
    }),

  getByJoinCode: protectedProcedure
    .input(z.object({ joinCode: z.string() }))
    .query(async ({ input, ctx }) => {
      const session = await sessionRepo.findByJoinCode(ctx.db, input.joinCode);
      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found.",
        });
      }
      return session;
    }),
});