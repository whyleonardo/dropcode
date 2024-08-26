import type { NextAuthConfig } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@dropcode/db"
import { env } from "@dropcode/env/web"

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
  callbacks: {
    async session({ session, ...params }) {
      if ("token" in params && session.user) {
        session.user.id = params.token.sub as string
      }

      return session
    },
  },
} satisfies NextAuthConfig
