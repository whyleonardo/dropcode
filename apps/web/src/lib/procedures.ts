import { UnauthorizedError } from "@/errors/unauthorized-error"
import { generatePublicId } from "@/utils/gen-public-id"

import { auth } from "@dropcode/auth"

import { createServerActionProcedure } from "zsa"

export const authProcedure = createServerActionProcedure().handler(async () => {
  try {
    const userSession = await auth()

    const userId = userSession?.user?.id

    if (!userId && !userSession) {
      throw new UnauthorizedError()
    }

    return {
      user: {
        id: userSession?.user?.id as string,
        name: userSession?.user?.name as string,
        image: userSession?.user?.image as string,
        email: userSession?.user?.email as string,
      },
    }
  } catch {
    throw new UnauthorizedError()
  }
})

export const generatePublicIdProcedure = createServerActionProcedure(
  authProcedure
).handler(async ({ ctx }) => {
  return {
    user: ctx.user,
    generatedPublicId: generatePublicId(),
  }
})
