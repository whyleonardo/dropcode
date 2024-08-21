import { cn } from "@soli/tailwind/utils"

const CardRoot = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "bg-gray-2 min-h-36 max-w-[332px] space-y-2 rounded-xl border p-4 transition-all hover:opacity-85",
        className
      )}
    >
      {children}
    </div>
  )
}

const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <header className={cn("flex items-center justify-between", className)}>
      {children}
    </header>
  )
}

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-xl font-medium">{children}</span>
}

const CardIcons = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-1">{children}</div>
  )
}

const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p className={cn("text-gray-11 min-h-14 text-sm", className)}>{children}</p>
  )
}

const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1">{children}</div>
}

const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "dark:bg-gray-2 bg-gray-3 h-36 min-h-36 w-[332px] max-w-[332px] animate-pulse rounded-xl p-4 transition-all hover:opacity-85",
        className
      )}
    />
  )
}

export {
  CardRoot,
  CardHeader,
  CardTitle,
  CardIcons,
  CardDescription,
  CardFooter,
  CardSkeleton,
}
