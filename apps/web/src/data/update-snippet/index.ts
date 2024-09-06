"use server"

import { authProcedure } from "@/lib/procedures"

import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { SameSlugError } from "@/errors/same-slug-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"
import { Prisma } from "@dropcode/db/types"

import { updateSnippetSchema } from "./schema"

export const updateSnippet = authProcedure
  .createServerAction()
  .input(updateSnippetSchema)
  .handler(async ({ input, ctx }) => {
    const { title, description, isPublic, id: snippetId } = input

    const { user } = ctx
    try {
      await db.$transaction(async (tx) => {
        const currentSnippet = await tx.snippet.findUnique({
          where: {
            id: snippetId,
            userId: user.id,
          },
          select: {
            title: true,
          },
        })

        if (!currentSnippet) {
          throw new ResourceNotFoundError()
        }

        const titleHasChanged = currentSnippet.title !== title

        if (titleHasChanged) {
          const slug = createSlug(title)

          await tx.snippet.update({
            where: {
              id: snippetId,
              userId: user.id,
            },
            data: {
              description,
              isPublic,
              title,
              slug,
            },
          })
        }

        await tx.snippet.update({
          where: {
            id: snippetId,
            userId: user.id,
          },
          data: {
            description,
            isPublic,
          },
        })
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new SameSlugError()
        }
      }

      throw new UnexpectedError(
        "An unexpected error occurred while updating your snippet"
      )
    }
  })
