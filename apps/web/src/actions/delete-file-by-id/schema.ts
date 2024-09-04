import { z } from "zod"

export const deleteFileByIdSchema = z.object({
  fileId: z.string().uuid(),
  snippetSlug: z.string(),
})
