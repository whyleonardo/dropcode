import { z } from "zod"

export const getFileByIdSchema = z.object({
  snippetSlug: z.string(),
  fileId: z.string().uuid(),
})
