"use server"

import { authProcedure } from "@/lib/procedures"

import { db } from "@dropcode/db"

import { fetchFilesBySnippetSlugSchema } from "./schema"

export const fetchFilesBySnippetSlug = authProcedure
  .createServerAction()
  .input(fetchFilesBySnippetSlugSchema)
  .handler(async ({ ctx, input }) => {
    const { user } = ctx

    const { snippetSlug } = input

    const files = await db.file.findMany({
      where: {
        userId: user.id,
        snippet: {
          slug: snippetSlug,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return files
  })
