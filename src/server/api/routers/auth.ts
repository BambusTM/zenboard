import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {RegisterSchema} from "@/lib/schemas/authSchema";
import {registerUser, loginUser} from "@/server/api/services/authService";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(RegisterSchema)
        .mutation(async ({ input, ctx }) => {
            return registerUser(input, ctx);
        }),

    login: publicProcedure
        .input(z.object({email: z.string(), password: z.string()}))
        .mutation(async ({ input, ctx }) => {
            return loginUser(input, ctx);
        }),
});