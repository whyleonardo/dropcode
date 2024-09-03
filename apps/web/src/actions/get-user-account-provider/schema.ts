import { z } from "zod"

export const getUserAccountProviderSchema = z.object({
  userId: z.string(),
})
