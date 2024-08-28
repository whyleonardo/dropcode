import { Icons } from "@/components/icons"

import type { LucideProps } from "lucide-react"
import type { BundledLanguage } from "shiki/bundle-full.mjs"

type Lang = Record<
  string,
  {
    id: BundledLanguage
    name: string
    icon: (props: LucideProps) => JSX.Element
    extension: string
    enum: string
    color: string
  }
>

export const langs: Lang = {
  ANGULAR: {
    id: "angular-ts",
    name: "Angular",
    icon: Icons.angular,
    extension: "angular",
    enum: "ANGULAR",
    color: "#dd1b16",
  },
  ASTRO: {
    id: "astro",
    name: "Astro",
    icon: Icons.astro,
    extension: "astro",
    enum: "ASTRO",
    color: "#ff5a1f",
  },
  CSS: {
    id: "css",
    name: "CSS",
    icon: Icons.css,
    extension: "css",
    enum: "CSS",
    color: "#2965f1",
  },
  CPP: {
    id: "cpp",
    name: "C++",
    icon: Icons.cpp,
    extension: "cpp",
    enum: "CPP",
    color: "#00599c",
  },
  GO: {
    id: "go",
    name: "Go",
    icon: Icons.go,
    extension: "go",
    enum: "GO",
    color: "#23AFD0",
  },
  HTML: {
    id: "html",
    name: "HTML",
    icon: Icons.html,
    extension: "html",
    enum: "HTML",
    color: "#e34c26",
  },
  JAVA: {
    id: "java",
    name: "Java",
    icon: Icons.java,
    extension: "java",
    enum: "JAVA",
    color: "#5382a1",
  },
  JAVASCRIPT: {
    id: "javascript",
    name: "JavaScript",
    icon: Icons.javascript,
    extension: "js",
    enum: "JAVASCRIPT",
    color: "#f0db4f",
  },
  JSON: {
    id: "jsonc",
    name: "JSON",
    icon: Icons.json,
    extension: "json",
    enum: "JSON",
    color: "#4a4a4a",
  },
  JSX: {
    id: "jsx",
    name: "JSX",
    icon: Icons.jsx,
    extension: "jsx",
    enum: "JSX",
    color: "#61dafb",
  },
  PHP: {
    id: "php",
    name: "PHP",
    icon: Icons.php,
    extension: "php",
    enum: "PHP",
    color: "#4f5b93",
  },
  PYTHON: {
    id: "python",
    name: "Python",
    icon: Icons.python,
    extension: "py",
    enum: "PYTHON",
    color: "#3572a5",
  },
  SVELTE: {
    id: "svelte",
    name: "Svelte",
    icon: Icons.svelte,
    extension: "svelte",
    enum: "SVELTE",
    color: "#ff3e00",
  },
  TSX: {
    id: "tsx",
    name: "TSX",
    icon: Icons.tsx,
    extension: "tsx",
    enum: "TSX",
    color: "#007acc",
  },
  TYPESCRIPT: {
    id: "typescript",
    name: "TypeScript",
    icon: Icons.typescript,
    extension: "ts",
    enum: "TYPESCRIPT",
    color: "#3178c6",
  },
  VUE: {
    id: "vue",
    name: "Vue",
    icon: Icons.vue,
    extension: "vue",
    enum: "VUE",
    color: "#42b883",
  },
  YAML: {
    id: "yaml",
    name: "YAML",
    icon: Icons.yaml,
    extension: "yaml",
    enum: "YAML",
    color: "#cb171e",
  },
} as const
