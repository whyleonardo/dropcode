"use server"

import { authProcedure } from "@/actions/procedures"

import { db } from "@dropcode/db"

import { fetchFilesBySnippetSlugSchema } from "./schema"

export const fetchFilesBySnippetSlug = authProcedure
  .createServerAction()
  .input(fetchFilesBySnippetSlugSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetSlug } = input

    const {
      user: { id: userId },
    } = ctx

    const files = await db.file.findMany({
      where: {
        userId,
        snippet: {
          slug: snippetSlug,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return files
  })
