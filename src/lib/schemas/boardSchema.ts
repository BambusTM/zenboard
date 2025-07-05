import z from "zod";

export const CreateBoardSchema = z.object({
    name: z.string().min(1, "Board name is required"),
    createSession: z.boolean().default(false),
});

export const CreateBoardFormSchema = z.object({
    name: z.string().min(1, "Please name your board."),
    createSession: z.boolean().default(false),
});

export type CreateBoardType = z.infer<typeof CreateBoardSchema>;
export type CreateBoardFormType = z.infer<typeof CreateBoardFormSchema>;
