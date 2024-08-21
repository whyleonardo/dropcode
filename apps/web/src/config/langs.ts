import { Icons } from "@/components/icons"

import type { LucideProps } from "lucide-react"
import type { BundledLanguage } from "shiki/bundle/web"

type Lang = Record<
  string,
  {
    id: BundledLanguage
    name: string
    icon: (props: LucideProps) => JSX.Element
    extension: string
  }
>

export const langs: Lang = {
  ANGULAR: {
    id: "angular-ts",
    name: "Angular",
    icon: Icons.angular,
    extension: "angular",
  },
  ASTRO: { id: "astro", name: "Astro", icon: Icons.astro, extension: "astro" },
  CSS: { id: "css", name: "CSS", icon: Icons.css, extension: "css" },
  CPP: { id: "cpp", name: "C++", icon: Icons.cpp, extension: "cpp" },
  HTML: { id: "html", name: "HTML", icon: Icons.html, extension: "html" },
  JAVA: { id: "java", name: "Java", icon: Icons.java, extension: "java" },
  JAVASCRIPT: {
    id: "javascript",
    name: "JavaScript",
    icon: Icons.javascript,
    extension: "js",
  },
  JSON: { id: "jsonc", name: "JSON", icon: Icons.json, extension: "json" },
  JSX: { id: "jsx", name: "JSX", icon: Icons.jsx, extension: "jsx" },
  PHP: { id: "php", name: "PHP", icon: Icons.php, extension: "php" },
  PYTHON: { id: "python", name: "Python", icon: Icons.python, extension: "py" },
  SVELTE: {
    id: "svelte",
    name: "Svelte",
    icon: Icons.svelte,
    extension: "svelte",
  },
  TSX: { id: "tsx", name: "TSX", icon: Icons.tsx, extension: "tsx" },
  TYPESCRIPT: {
    id: "typescript",
    name: "TypeScript",
    icon: Icons.typescript,
    extension: "ts",
  },
  VUE: { id: "vue", name: "Vue", icon: Icons.vue, extension: "vue" },
  YAML: { id: "yaml", name: "YAML", icon: Icons.yaml, extension: "yaml" },
} as const
