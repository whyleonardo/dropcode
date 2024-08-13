import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets"

import { z } from "zod"

export const env = createEnv({
  extends: [vercel()],
  client: {},
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  },
  server: {
    DATABASE_URL: z.string().url().startsWith("postgres"),
    AUTH_SECRET: z.string().min(1),
    AUTH_GITHUB_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_VALIDATION,
})
