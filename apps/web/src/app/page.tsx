import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

const Page = () => {
  return (
    <div className="container relative mx-auto flex h-screen items-center justify-center">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <Link href="/auth/login">Login</Link>
    </div>
  )
}

export default Page
