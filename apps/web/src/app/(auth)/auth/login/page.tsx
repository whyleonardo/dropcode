import { Icons } from "@/components/icons"
import { DotPattern } from "@/components/ui/bg-dot-pattern"
import { Button } from "@/components/ui/button"
import { TypingAnimation } from "@/components/ui/motion/text-typing"
import { Vignette } from "@/components/ui/vignette"

import { signIn } from "@dropcode/auth"
import { cn } from "@dropcode/tailwind/utils"

const LoginPage = async () => {
  return (
    <div className="container mx-auto flex h-full items-center justify-center overflow-y-hidden">
      <Vignette className="right-[-36rem] top-[-36rem] -z-50 hidden size-[54rem] xl:size-[64rem] dark:block" />
      <Vignette className="bottom-[-36rem] left-[-36rem] -z-50 hidden size-[54rem] xl:size-[64rem] dark:block" />

      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        )}
      />

      <form
        className="flex flex-col gap-8 overflow-hidden p-12"
        action={async () => {
          "use server"
          await signIn("github")
        }}
      >
        <Icons.logo className="fill-foreground mx-auto size-20 px-2" />

        <div className="text-center">
          <TypingAnimation
            duration={150}
            text="Dropcode"
            className="select-none font-mono text-3xl font-medium"
            withCaret
          />

          <span className="text-muted-foreground text-sm tracking-tight">
            All-in-one-solution to store your thoughts.
          </span>
        </div>

        <Button type="submit" variant="neutral" className="max-w-80">
          <Icons.github className="fill-background mr-2 size-5" />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
