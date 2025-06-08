import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(z.object({email: z.string(), password: z.string()}))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.create({
                data: {
                    email: input.email,
                    password: input.password,
                },
            });
        }),

    login: publicProcedure
        .input(z.object({email: z.string(), password: z.string()}))
        .mutation(async ({ ctx, input }) => {
            return {};
        }),
})