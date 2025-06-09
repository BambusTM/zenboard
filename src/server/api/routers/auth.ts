import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import type {RegisterSchema} from "@/lib/schemas/user";
import {registerUser} from "@/server/api/services/authService";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(RegisterSchema)
        .mutation(async ({ input, ctx }) => {
            return registerUser(input, ctx);
        }),

    login: publicProcedure
        .input(z.object({email: z.string(), password: z.string()}))
        .mutation(async ({ ctx, input }) => {
            return {};
        }),
})