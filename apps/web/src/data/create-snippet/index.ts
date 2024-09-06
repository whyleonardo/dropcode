"use server"

import { redirect } from "next/navigation"

import { generatePublicIdProcedure } from "@/lib/procedures"

import { SameSlugError } from "@/errors/same-slug-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"
import { Prisma, type Snippet } from "@dropcode/db/types"

import { createSnippetSchema } from "./schema"

export const createSnippet = generatePublicIdProcedure
  .createServerAction()
  .input(createSnippetSchema)
  .handler(async ({ input, ctx }) => {
    const { title, description, isPublic } = input

    const { user, generatedPublicId } = ctx

    const slug = createSlug(title)

    let snippet: Snippet

    try {
      snippet = await db.snippet.create({
        data: {
          title,
          description,
          isPublic,
          publicId: generatedPublicId,
          slug,
          userId: user.id,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new SameSlugError()
        }
      }

      throw new UnexpectedError(
        "An unexpected error occurred while creating your snippet"
      )
    }

    redirect(`/snippets/${snippet.slug}`)
  })
