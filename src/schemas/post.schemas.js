import {z} from "zod"

export const createPostSchema = z.object({
    content: z.string().max(50,"too much long"),
})

export const updatePostSchema = z.object({
    content: z.string().max(50,"too much long").nullable().nullish(),
    likeFlag: z.boolean().default(false),
})

