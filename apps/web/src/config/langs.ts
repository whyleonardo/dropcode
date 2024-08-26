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
    enum: string
  }
>

export const langs: Lang = {
  ANGULAR: {
    id: "angular-ts",
    name: "Angular",
    icon: Icons.angular,
    extension: "angular",
    enum: "ANGULAR",
  },
  ASTRO: {
    id: "astro",
    name: "Astro",
    icon: Icons.astro,
    extension: "astro",
    enum: "ASTRO",
  },
  CSS: {
    id: "css",
    name: "CSS",
    icon: Icons.css,
    extension: "css",
    enum: "CSS",
  },
  CPP: {
    id: "cpp",
    name: "C++",
    icon: Icons.cpp,
    extension: "cpp",
    enum: "CPP",
  },
  HTML: {
    id: "html",
    name: "HTML",
    icon: Icons.html,
    extension: "html",
    enum: "HTML",
  },
  JAVA: {
    id: "java",
    name: "Java",
    icon: Icons.java,
    extension: "java",
    enum: "JAVA",
  },
  JAVASCRIPT: {
    id: "javascript",
    name: "JavaScript",
    icon: Icons.javascript,
    extension: "js",
    enum: "JAVASCRIPT",
  },
  JSON: {
    id: "jsonc",
    name: "JSON",
    icon: Icons.json,
    extension: "json",
    enum: "JSON",
  },
  JSX: {
    id: "jsx",
    name: "JSX",
    icon: Icons.jsx,
    extension: "jsx",
    enum: "JSX",
  },
  PHP: {
    id: "php",
    name: "PHP",
    icon: Icons.php,
    extension: "php",
    enum: "PHP",
  },
  PYTHON: {
    id: "python",
    name: "Python",
    icon: Icons.python,
    extension: "py",
    enum: "PYTHON",
  },
  SVELTE: {
    id: "svelte",
    name: "Svelte",
    icon: Icons.svelte,
    extension: "svelte",
    enum: "SVELTE",
  },
  TSX: {
    id: "tsx",
    name: "TSX",
    icon: Icons.tsx,
    extension: "tsx",
    enum: "TSX",
  },
  TYPESCRIPT: {
    id: "typescript",
    name: "TypeScript",
    icon: Icons.typescript,
    extension: "ts",
    enum: "TYPESCRIPT",
  },
  VUE: {
    id: "vue",
    name: "Vue",
    icon: Icons.vue,
    extension: "vue",
    enum: "VUE",
  },
  YAML: {
    id: "yaml",
    name: "YAML",
    icon: Icons.yaml,
    extension: "yaml",
    enum: "YAML",
  },
} as const
