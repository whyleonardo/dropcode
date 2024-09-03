import { z } from "zod"

export const deleteAccountSchema = z.object({
  userId: z.string(),
})
