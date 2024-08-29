"use server"

import { redirect } from "next/navigation"

import { langs } from "@/config/langs"

import { authProcedure } from "@/actions/procedures"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"
import { type File, Prisma } from "@dropcode/db/types"

import { createFileSchema } from "./schema"

export const createFile = authProcedure
  .createServerAction()
  .input(createFileSchema)
  .handler(async ({ input, ctx }) => {
    const { content, language, name, snippetSlug } = input

    const { user } = ctx

    const slug = createSlug(`${name}-${langs[language].extension}`)

    const snippet = await db.snippet.findUnique({
      where: {
        slug: snippetSlug,
        userId: user.id,
      },
      select: {
        id: true,
        slug: true,
        collection: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (!snippet) {
      throw new ResourceNotFoundError()
    }

    let file: File

    try {
      file = await db.file.create({
        data: {
          content,
          language,
          name,
          slug,
          snippetId: snippet.id,
          userId: user.id,
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

    redirect(
      `/collections/${snippet.collection?.slug}/${snippet.slug}/${file.slug}`
    )
  })
