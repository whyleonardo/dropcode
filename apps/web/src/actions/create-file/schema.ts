import { z } from "zod"

export const createFileSchema = z.object({
  name: z.string({ message: "Name is required" }).trim().min(1).max(40),
  language: z.union(
    [
      z.literal("ANGULAR", { message: "Invalid language" }),
      z.literal("ASTRO"),
      z.literal("CSS"),
      z.literal("CPP"),
      z.literal("HTML"),
      z.literal("JAVA"),
      z.literal("JAVASCRIPT"),
      z.literal("JSON"),
      z.literal("JSX"),
      z.literal("PHP"),
      z.literal("PYTHON"),
      z.literal("SVELTE"),
      z.literal("TSX"),
      z.literal("TYPESCRIPT"),
      z.literal("VUE"),
      z.literal("YAML"),
    ],
    { message: "Invalid language" }
  ),
  content: z.string().min(1),
  snippetSlug: z.string(),
})