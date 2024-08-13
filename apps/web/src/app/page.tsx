import { ThemeToggle } from "@/components/theme-toggle"

const Page = () => {
  return (
    <div className="container relative mx-auto flex h-screen items-center justify-center">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <h1 className="~/2xl:~text-4xl/7xl font-bold tracking-tight">
        Home Page
      </h1>
    </div>
  )
}

export default Page
