"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/lib/procedures"

import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"
import { type File, Prisma } from "@dropcode/db/types"

import { updateFileSchema } from "./schema"

export const updateFile = authProcedure
  .createServerAction()
  .input(updateFileSchema)
  .handler(async ({ input, ctx }) => {
    const { content, language, name, snippetId, id: fileId } = input

    const { user } = ctx

    const snippet = await db.snippet.findUnique({
      where: {
        id: snippetId,
        userId: user.id,
      },
      select: {
        id: true,
        slug: true,
      },
    })

    if (!snippet) {
      throw new ResourceNotFoundError()
    }

    let file: File

    try {
      file = await db.file.update({
        where: {
          id: fileId,
          userId: user.id,
          snippet: { id: snippet.id },
        },
        data: {
          content,
          language,
          name,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error(
            "A file with the same language and name already exists"
          )
        }
      }

      throw new UnexpectedError()
    }

    revalidatePath(`/snippets/${snippet.slug}/file/${file.publicId}`)
  })
