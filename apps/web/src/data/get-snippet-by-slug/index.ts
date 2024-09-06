"use server"

import { authProcedure } from "@/lib/procedures"

import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"
import type { Snippet } from "@dropcode/db/types"

import { getSnippetBySlugSchema } from "./schema"

export const getSnippetBySlug = authProcedure
  .createServerAction()
  .input(getSnippetBySlugSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetSlug } = input

    const { user } = ctx

    let snippet: Snippet

    try {
      snippet = await db.snippet.findFirstOrThrow({
        where: {
          userId: user.id,
          slug: snippetSlug,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    return snippet
  })
