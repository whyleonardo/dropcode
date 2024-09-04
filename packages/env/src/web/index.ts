import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets"

import { z } from "zod"

export const env = createEnv({
  extends: [vercel()],
  client: {
    NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  },
  server: {
    DATABASE_URL: z.string().url().startsWith("postgres"),
    AUTH_SECRET: z.string().min(1),
    AUTH_GITHUB_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
    AUTH_GITLAB_ID: z.string().min(1),
    AUTH_GITLAB_SECRET: z.string().min(1),
    UPSTASH_REDIS_URL: z.string().url(),
    UPSTASH_REDIS_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_VALIDATION,
})
