import { z } from "zod"

export const deleteSnippetByIdSchema = z.object({
  snippetId: z.string().uuid(),
})
