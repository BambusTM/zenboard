import {z} from "zod";

export const BoardSchema = z.object({
    name: z.string(),
    session:
})

export const BoardFormSchema = z.object({
    name: z.string().required("Please name your board.")
});

export type CreateBoardType = z.infer<typeof BoardSchema>;
export type CreateBoardFormType = z.infer<typeof BoardFormSchema>;
