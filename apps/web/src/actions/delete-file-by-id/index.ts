"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@soli/db"

import { deleteFileByIdSchema } from "./schema"

export const deleteFileById = authProcedure
  .createServerAction()
  .input(deleteFileByIdSchema)
  .handler(async ({ input, ctx }) => {
    const { fileId, snippetId } = input

    const { user } = ctx

    try {
      await db.file.delete({
        where: {
          userId: user.id,
          id: fileId,
          snippetId,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    const snippet = await db.snippet.findUnique({
      where: { id: snippetId, userId: user.id },
      select: {
        slug: true,
        files: {
          take: 1,
          orderBy: {
            updatedAt: "asc",
          },
        },
      },
    })

    if (!snippet) {
      throw new ResourceNotFoundError()
    }

    if (snippet.files.length === 0) {
      revalidatePath(`/snippet/${snippet.slug}`)

      return {
        fileIdToRedirect: null,
      }
    }

    revalidatePath(`/snippet/${snippet.slug}`)

    return {
      fileIdToRedirect: snippet.files[0].id,
    }
  })
