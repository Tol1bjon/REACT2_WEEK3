import { z } from 'zod'

export const Schemas = z.object({
    name: z.string(),
    email: z.string().email(),
    job: z.string(),
    age: z.coerce.number(),
    status: z.preprocess((val) => val == "true" || val == true, z.boolean()),
    avatar: z.string()
})