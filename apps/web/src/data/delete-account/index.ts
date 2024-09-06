"use server"

import { authProcedure } from "@/lib/procedures"

import { UnauthorizedError } from "@/errors/unauthorized-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { signOut } from "@dropcode/auth"
import { db } from "@dropcode/db"

export const deleteAccount = authProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { user: authenticatedUser } = ctx

    if (!authenticatedUser) {
      throw new UnauthorizedError()
    }

    try {
      await db.user.delete({
        where: {
          id: authenticatedUser.id,
        },
      })
    } catch {
      throw new UnexpectedError()
    } finally {
      await signOut()
    }
  })
