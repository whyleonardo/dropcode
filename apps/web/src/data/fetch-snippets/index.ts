"use server"

import { authProcedure } from "@/lib/procedures"

import { db } from "@dropcode/db"

import { fetchSnippetsSchema } from "./schema"

export const fetchSnippets = authProcedure
  .createServerAction()
  .input(fetchSnippetsSchema)
  .handler(async ({ ctx }) => {
    const {
      user: { id: userId },
    } = ctx

    const snippets = await db.snippet.findMany({
      where: {
        userId,
      },
      include: {
        files: true,
      },
    })

    return snippets
  })
