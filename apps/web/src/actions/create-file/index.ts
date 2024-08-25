"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@soli/db"

import { createFileSchema } from "./schema"

export const createFile = authProcedure
  .createServerAction()
  .input(createFileSchema)
  .handler(async ({ input, ctx }) => {
    const { content, language, name, snippetSlug } = input

    const { user } = ctx

    const snippet = await db.snippet.findUnique({
      where: {
        slug: snippetSlug,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })

    if (!snippet) {
      throw new ResourceNotFoundError()
    }

    try {
      await db.file.create({
        data: {
          content,
          language,
          name,
          snippetId: snippet.id,
          userId: user.id,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    revalidatePath(`/snippet/${snippetSlug}`)
  })
