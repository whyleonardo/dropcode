"use server"

import { authProcedure } from "@/actions/procedures"

import { db } from "@dropcode/db"

import { getSnippetBySlugSchema } from "./schema"

export const getSnippetBySlug = authProcedure
  .createServerAction()
  .input(getSnippetBySlugSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetSlug } = input

    const {
      user: { id: userId },
    } = ctx

    const snippet = await db.snippet.findUnique({
      where: {
        userId,

        slug: snippetSlug,
      },
    })

    return snippet
  })
