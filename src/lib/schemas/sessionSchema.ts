import {z} from "zod";

export const SessionSchema = z.object({
    code: z.string().min(8).max(8)
});
