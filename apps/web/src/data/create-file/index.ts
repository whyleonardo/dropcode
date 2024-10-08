"use server"

import { redirect } from "next/navigation"

import { generatePublicIdProcedure } from "@/lib/procedures"

import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"
import { type File, Prisma } from "@dropcode/db/types"

import { createFileSchema } from "./schema"

const MAX_FILES_PER_SNIPPET = 5
// TODO: Uncomment when we have pro features
// const MAX_FILES_PER_SNIPPET_WITH_PRO = 10

export const createFile = generatePublicIdProcedure
  .createServerAction()
  .input(createFileSchema)
  .handler(async ({ input, ctx }) => {
    const { content, language, name, snippetSlug } = input

    const { user, generatedPublicId } = ctx

    const snippet = await db.snippet.findFirstOrThrow({
      where: {
        slug: snippetSlug,
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

    const fileCount = await db.file.count({
      where: {
        snippetId: snippet.id,
      },
    })

    if (fileCount >= MAX_FILES_PER_SNIPPET) {
      throw new Error("You can't have more than 5 files per snippet")
    }

    let file: File

    try {
      file = await db.file.create({
        data: {
          content,
          language,
          name,
          publicId: generatedPublicId,
          snippetId: snippet.id,
          userId: user.id,
        },
      })
    } catch (error) {
      console.error(error)

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error(
            "A file with the same language and name already exists on this snippet"
          )
        }
      }

      throw new UnexpectedError()
    }

    redirect(`/snippets/${snippet.slug}/file/${file.publicId}`)
  })
