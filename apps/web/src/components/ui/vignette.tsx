import { cn } from "@dropcode/tailwind/utils"

interface VignetteProps {
  className?: string
}

export const Vignette = ({ className }: VignetteProps) => {
  return (
    <div
      className={cn("pointer-events-none absolute opacity-25", className)}
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, var(--gray10) 0%, var(--gray1) 100%)",
      }}
    />
  )
}
