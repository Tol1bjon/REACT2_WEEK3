import { z } from "zod";

export const Schema = z.object({
    avatar: z.string(),
    name: z.string(),
    email: z.string(),
    job: z.string(),
    status: z.preprocess((val) => val == "true" || val == true, z.boolean())
})