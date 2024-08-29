import { cn } from "@dropcode/tailwind/utils"
import { Slot } from "@radix-ui/react-slot"

interface DropProps {
  children: React.ReactNode
  className?: string
}

interface DropContentProps {
  children: React.ReactNode
  className?: string
}

interface DropFilesListProps {
  children: React.ReactNode
  className?: string
}

interface DropFileTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  active?: boolean
}

const Drop = ({ children, className }: DropProps) => {
  return (
    <div
      className={cn("size-full overflow-hidden rounded-lg border", className)}
    >
      {children}
    </div>
  )
}

const DropFilesList = ({ children, className }: DropFilesListProps) => {
  return (
    <header
      className={cn(
        "bg-gray-2 flex h-12 min-h-12 w-full items-center justify-start gap-2 overflow-y-hidden rounded-none border-b p-2 px-4",
        className
      )}
    >
      {children}
    </header>
  )
}

const DropFileTrigger = ({
  children,
  className,
  asChild,
  active,
}: DropFileTriggerProps) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "bg-gray-3 hover:bg-gray-4 inline-flex h-7 items-center space-x-2 rounded-lg border p-2 font-mono text-sm transition-colors",
        active && "bg-gray-5",
        className
      )}
    >
      {children}
    </Comp>
  )
}

const DropContent = ({ children, className }: DropContentProps) => {
  return (
    <main className={cn("bg-background size-full", className)}>{children}</main>
  )
}

export { Drop, DropContent, DropFilesList, DropFileTrigger }
