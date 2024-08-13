import type { NextAuthConfig } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@soli/db"
import { env } from "@soli/env/web"

import { providers } from "./providers"

export const authConfig = {
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [...providers],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig
