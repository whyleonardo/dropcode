"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { SameSlugError } from "@/errors/same-slug-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"

import { createCollectionSchema } from "./schema"

export const createCollection = authProcedure
  .createServerAction()
  .input(createCollectionSchema)
  .handler(async ({ input, ctx }) => {
    const { title } = input

    const { user } = ctx

    const slug = createSlug(title)

    const findForRepeatedCollectionSlug = await db.collection.findUnique({
      where: {
        slug,
        userId: user.id,
      },
    })

    if (findForRepeatedCollectionSlug) {
      throw new SameSlugError("collection")
    }

    try {
      await db.collection.create({
        data: {
          title,
          slug,
          userId: user.id,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    revalidatePath("/collections")
  })
