"use server"

import { authProcedure } from "@/actions/procedures"
import { UnauthorizedError } from "@/errors/unauthorized-error"

import { db } from "@dropcode/db"

import { getUserAccountProviderSchema } from "./schema"

export const getUserAccountProvider = authProcedure
  .createServerAction()
  .input(getUserAccountProviderSchema)
  .handler(async ({ input, ctx }) => {
    const { userId } = input

    const { user: contextUser } = ctx

    if (contextUser.id !== userId) {
      throw new UnauthorizedError()
    }

    const userAccountProvider = await db.account.findFirstOrThrow({
      where: {
        userId,
      },
      select: {
        provider: true,
      },
    })

    return userAccountProvider
  })
